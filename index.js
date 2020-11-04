const { Pool } = require('pg');

const connectionString = 'postgresql://postgres:postgres@localhost:5432/postgres';
const pool = new Pool({
  connectionString
});

const name = "a sdf asdf asf";
const username = new Date().getTime().toString();
const passwordHash = "asdfa sdf asdfa";

pool
  .query('INSERT INTO users(name, username, password) VALUES($1, $2, $3) RETURNING name, username', [name, username, passwordHash])
  .then((res) => {

    pool.query('SELECT name, username from users')
      .then(res => {
        for (let i = 0; i < res.rowCount; i++) {
          console.dir(res.rows[i]);
        }
      })
      .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
