var mysql = require('mysql');
var pool;

module.export = {
    getPool: () => {
        if (pool) return pool;
        pool = mysql.createPool({
            host     : process.env.DATABASE_HOST,
            user     : process.env.USER,
            password : process.env.PASSWORD,
            database : process.env.DATABASE_NAME
        });
        return pool;
    }
};