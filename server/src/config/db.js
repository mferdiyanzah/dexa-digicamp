const pg = require("pg");

const pool = new pg.Pool({
  user: "root",
  password: "password",
  database: "dexa-digicamp",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
