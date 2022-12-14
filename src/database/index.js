const {Pool} = require('pg');
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT
})




module.exports = {
    query: (text,params) => {
        return pool.query(text,params);
    },
    getClient: () => {
        return pool.connect();
    }
}