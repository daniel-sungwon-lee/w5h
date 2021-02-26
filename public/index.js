require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl : {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(express.json());

//auth
app.post('/api/signUp', (req, res, next) => {
  const { email, password } = req.body;

  argon2
   .hash(password)
   .then(hashedPassword => {
     const sql = `
     insert into "users" ("email", "hashedPassword")
     values ($1, $2)
     `;
     const params = [email, hashedPassword];

     db.query(sql, params)
      .then(result => {
        res.status(201).json(result.rows[0]);
      })
      .catch(err => next(err));
   })
   .catch(err => next(err));
});

app.post('/api/login', (req, res, next) => {

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`express server listening on ${process.env.PORT}`);
});
