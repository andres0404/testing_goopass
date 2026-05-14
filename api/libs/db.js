const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.POSTGRES_HOST || 'postgres',
    port: process.env.POSTGRES_PORT || '5432',
    user: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASSWORD || 'secret',
    database: process.env.POSTGRES_DB || 'goopass_proyectos ',
});

module.exports = pool;