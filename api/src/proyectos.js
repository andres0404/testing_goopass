const express = require('express');
const pool = require('../libs/db');
const router = express.Router();

// select
router.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * from proyectos");
        res.json(rows);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// insert
router.post("/", async (req, res) => {
    try {
        const { pyt_nom, pyt_desc, pyt_fec_ini, pyt_fec_fin } = req.body;
        if (!pyt_nom || !pyt_desc || !pyt_fec_ini || !pyt_fec_fin ){
            return res.status(404).json({error: 'pyt_nom, pyt_desc, pyt_fec_ini, pyt_fec_fin son requeridos'});
        }
        const { rows } = await pool.query(`INSERT INTO proyectos (pyt_nom, pyt_desc, pyt_fec_ini, pyt_fec_fin) values ($1,$2,$3,$4) RETURNING *`,[pyt_nom, pyt_desc, pyt_fec_ini, pyt_fec_fin]);
        res.status(201).json(rows[0]);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

// actualizar
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { pyt_nom, pyt_desc, pyt_fec_ini, pyt_fec_fin } = req.body;
    try {
        const { rows } = await pool.query(`update proyectos set pyt_nom = $1, pyt_desc = $2, pyt_fec_ini = $3, pyt_fec_fin = $4 where id_pyt = $5 RETURNING *`,[pyt_nom, pyt_desc, pyt_fec_ini, pyt_fec_fin, id]);
        if (rows.length === 0) {
            return res.status(404).json({error: 'Proyecto no encontrado'});
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
        const { rowCount } = await pool.query(`delete from proyectos where id_pyt = $1`, [id]);
        if (rowCount === 0 ) {
            return res.status(404).json({error: 'Proyecto no encontrado'});
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;
