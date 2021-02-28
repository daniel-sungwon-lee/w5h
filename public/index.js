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
  const { email, password } = req.body;

  const sql = `
  select "userId", "hashedPassword", "email"
  from "users"
  where "email" = $1
  `;
  const params = [email];

  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword, email } = user;
      argon2
        .verify(hashedPassword, password)
        .then(isMatch => {
          if (!isMatch) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

//entry
app.post('/api/entry/', (req, res, next) => {
  const { userId, who, what, date, where, why, how } = req.body;

  const sql = `
  insert into "applications"
    ("userId", "who", "what", "when", "where", "why", "how")
  values ($1, $2, $3, $4, $5, $6, $7)
  `;
  const params = [userId, who, what, date, where, why, how]

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows[0])
    })
    .catch(err => next(err))
})

app.use(errorMiddleware);

//home
app.get('/api/applications/:userId', (req, res, next) => {
  const userId = req.params.userId;

  const sql=`
  select * from "applications"
  where "userId" = $1
  `;
  const params = [userId];

  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));

})

app.listen(3001, () => {
  console.log(`express server listening on ${3001}`);
});
