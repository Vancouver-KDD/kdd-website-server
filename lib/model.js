const sql = require('sql-query');
const query = require('./database').query;

const createModel = ({ table }) => class Model {
    static table = table;
    static db = pool;

    static create(values) {
        const query = sql.insert().into(this.table).set(values).build();
        return this.db.query(query);
    }

    static all() {
        const query = sql.select().from(this.table).build();
        return this.db.query(query);
    }

    static where(condition) {
        const query = sql.select().from(this.table).where(condition).build();
        return this.db.query(query);
    }

    static query(query) {
        return this.db.query(query);
    }

    update(values) {
        const query = sql.update().into(this.table).set(values).build();
        return this.db.query(query);
    }
}

module.exports = createModel;