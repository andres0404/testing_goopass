const express = require('express');
const pool = require('../libs/db');
const router = express.Router();

// select
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query("SELECT * from usuarios where id_usu = $1", [id]);
        res.json(rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// insert
router.post("/", async (req, res) => {
    try {
        const { usu_nombre, usu_perfil } = req.body;
        if (!usu_nombre || usu_perfil === undefined ){
            return res.status(404).json({error: 'usu_nombre, usu_perfil son requeridos'});
        }
        const { rows } = await pool.query(`INSERT INTO usuarios (usu_nombre, usu_perfil) values ($1,$2) RETURNING *`,[usu_nombre, usu_perfil]);
        res.status(201).json(rows[0]);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// actualizar
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { usu_nombre, usu_perfil } = req.body;
    try {
        const { rows } = await pool.query(`update usuarios set usu_nombre = $1, usu_perfil = $2 where id_usu = $3 RETURNING *`,[usu_nombre, usu_perfil, id]);
        if (rows.length === 0) {
            return res.status(404).json({error: 'Usuario no encontrado'});
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
        const { rowCount } = await pool.query(`delete from usuarios where id_usu = $1`, [id]);
        if (rowCount === 0 ) {
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

// usuario_proyecto
// select
router.get("/proyecto/:id", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * from usuario_proyecto where id_usu = $1", [req.params.id]);
        res.json(rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// insert
router.post("/proyecto", async (req, res) => {
    try {
        const { id_usu, id_pyt } = req.body;
        if (!id_usu || !id_pyt ){
            return res.status(404).json({error: 'id_usu, id_pyt son requeridos'});
        }
        const { rows } = await pool.query(`INSERT INTO usuario_proyecto (id_usu, id_pyt) values ($1,$2) RETURNING *`,[id_usu, id_pyt]);
        res.status(201).json(rows[0]);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// delete
router.delete("/proyecto/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount } = await pool.query(`delete from usuario_proyecto where id_usu_pyt = $1`, [id]);
        if (rowCount === 0 ) {
            return res.status(404).json({error: 'Asignación no encontrada'});
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
