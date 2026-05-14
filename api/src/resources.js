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
// actualizar
router.put();
// insert
router.post("/", async (req, res) => {
    const {  }
});
// delete
router.delete();

module.exports = router;