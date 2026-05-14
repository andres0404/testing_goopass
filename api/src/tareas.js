const express = require('express');
const pool = require('../libs/db');
const router = express.Router();

// select
router.get("/:id_pyt", async (req, res) => {
    try {
        const { id_pyt } = req.params;
        const { rows } = await pool.query("SELECT * from tareas where id_pyt = $1",[id_pyt]);
        res.json(rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// insert
router.post("/", async (req, res) => {
    try {
        const { id_pyt, ta_nom, ta_desc, prioridad, estado, tar_fec_ini, tar_fec_fin } = req.body;
        if (!id_pyt || !ta_nom || !ta_desc || prioridad === undefined || estado === undefined || !tar_fec_ini || !tar_fec_fin ){
            return res.status(404).json({error: 'id_pyt, ta_nom, ta_desc, prioridad, estado, tar_fec_ini, tar_fec_fin son requeridos'});
        }
        const { rows } = await pool.query(`INSERT INTO tareas (id_pyt, ta_nom, ta_desc, prioridad, estado, tar_fec_ini, tar_fec_fin) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,[id_pyt, ta_nom, ta_desc, prioridad, estado, tar_fec_ini, tar_fec_fin]);
        res.status(201).json(rows[0]);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// actualizar
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { id_pyt, ta_nom, ta_desc, prioridad, estado, tar_fec_ini, tar_fec_fin } = req.body;
    try {
        const { rows } = await pool.query(`update tareas set id_pyt = $1, ta_nom = $2, ta_desc = $3, prioridad = $4, estado = $5, tar_fec_ini = $6, tar_fec_fin = $7 where id_tarea = $8 RETURNING *`,[id_pyt, ta_nom, ta_desc, prioridad, estado, tar_fec_ini, tar_fec_fin, id]);
        if (rows.length === 0) {
            return res.status(404).json({error: 'Tarea no encontrada'});
        }
        res.json(rows[0]);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// delete
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query(`delete from tareas where id_tarea = $1`, [id]);
        if (rowCount === 0 ) {
            return res.status(404).json({error: 'Tarea no encontrada'});
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// usuario_tareas
// select
router.get("/usuario/:id", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * from usuario_tareas where id_tarea = $1", [req.params.id]);
        res.json(rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// insert
router.post("/usuario", async (req, res) => {
    try {
        const { id_tarea, id_usu } = req.body;
        if (!id_tarea || !id_usu ){
            return res.status(404).json({error: 'id_tarea, id_usu son requeridos'});
        }
        const { rows } = await pool.query(`INSERT INTO usuario_tareas (id_tarea, id_usu) values ($1,$2) RETURNING *`,[id_tarea, id_usu]);
        res.status(201).json(rows[0]);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// delete
router.delete("/usuario/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query(`delete from usuario_tareas where id_usu_tar = $1`, [id]);
        if (rowCount === 0 ) {
            return res.status(404).json({error: 'Asignación no encontrada'});
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
