


const pg = require('pg');

const pool = new pg.Pool({
    database: 'todoapp',

    host: 'localhost',

    port: 5432
    
});

module.exports = pool;