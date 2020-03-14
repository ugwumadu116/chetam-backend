import pool from "../config/db";

pool.on("connect", () => {
  console.log("Connected");
});

const drop = () => {
  const usersTable = "DROP TABLE IF EXISTS users CASCADE";
  const dropTables = `${usersTable};`;

  pool.query(`${dropTables}`, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Tables dropped");
    }
    pool.end();
  });
};

const create = () => {
  const usersTable = `CREATE TABLE IF NOT EXISTS
  users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    address VARCHAR(1600),
    is_admin BOOLEAN DEFAULT FALSE
  )`;

  const migrationQueries = `${usersTable};`;
  pool.query(`${migrationQueries}`, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database migration successfully executed!");
    }
    pool.end();
  });
};

export { drop, create };

// eslint-disable-next-line eol-last
require("make-runnable/custom")({
  printOutputFrame: false
});
