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
        throw new ClientError(401, 'Invalid login');
      }
      const { userId, hashedPassword, email } = user;
      argon2
        .verify(hashedPassword, password)
        .then(isMatch => {
          if (!isMatch) {
            throw new ClientError(401, 'Invalid login');
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

//home
app.get('/api/applications/:userId', (req, res, next) => {
  const userId = req.params.userId;

  const sql=`
  select * from "applications"
  where "userId" = $1
  order by "when" desc
  `;
  const params = [userId];

  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
})

//application
app.get('/api/application/:userId/:applicationId', (req, res, next) => {
  const { userId, applicationId } = req.params

  const sql = `
  select * from "applications"
  where "userId" = $1
  and "applicationId" = $2
  `
  const params = [ userId, applicationId ]

  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows)
    })
    .catch(err => next(err));
})

//delete
app.delete('/api/application/:userId/:applicationId', (req, res, next) => {
  const { userId, applicationId } = req.params

  const sql = `
  delete from "applications"
  where "userId" = $1
  and "applicationId" = $2
  `
  const params = [ userId, applicationId ]

  db.query(sql, params)
    .then(result => {
      res.status(204).json(result.rows[0])
    })
    .catch(err => next(err));
})

//update
app.patch('/api/entry/:userId/:applicationId', (req, res, next) => {
  const { userId, applicationId } = req.params
  const { who, what, date, where, why, how } = req.body

  const sql = `
  update "applications"
  set "who" = $3,
      "what" = $4,
      "when" = $5,
      "where" = $6,
      "why" = $7,
      "how" = $8
  where "userId" = $1
  and "applicationId" = $2
  `
  const params = [ userId, applicationId, who, what, date, where, why, how ]

  db.query(sql,params)
    .then(result => {
      res.status(200).json(result.rows[0])
    })
    .catch(err => next(err))
})

app.use(errorMiddleware);

app.listen(3001, () => {
  console.log(`express server listening on ${3001}`);
});
