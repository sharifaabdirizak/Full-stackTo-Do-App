const pg = require('pg');

const pool = new pg.Pool({
    database: process.env.PGDATABASE,

    host: process.env.PGHOST,

    port: 5432,

    user: process.env.PGUSER,

    password: process.env.PGPASSWORD,

    ssl: {rejectUnauthorized: false}


    
});

module.exports = pool;