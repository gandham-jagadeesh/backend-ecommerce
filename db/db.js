const pg = require("pg-promise")({});

const options = {
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    host:process.env.DATABASE_HOST,
    database:process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT || 5432
}

const db = pg(options);
module.exports = {db,pg};
