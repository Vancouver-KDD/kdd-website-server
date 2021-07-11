var db = require('mysql');
var pool;

exports.query = (query, callback=null) => {
    if (!pool) {
        pool = db.createPool({
            host     : process.env.DATABASE_HOST,
            user     : process.env.DATABASE_USER,
            password : process.env.DATABASE_ROOT_PASSWORD,
            database : process.env.DATABASE_NAME
        });
    }
    return pool.query(query, function (error, results, fields) {
        if (error) throw error;
        if (callback)
            callback(results, fields);
    });
}

