//const express = require('express')
import app from './src/app.js'
import './src/db/dbConnect.js'

const HOST = 'localhost'
const port = 5000

// endpoint inicial
/*
app.get('/', (req, res) => {
  res.send({
    msg: "Servidor rodando!",
    codigo: 200
  });
});
*/
/*
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

console.log('acesso', DB_USER, DB_PASS)

const DB_USER_COMPASS = process.env.DB_USER_COMPASS
const DB_PASS_COMPASS = process.env.DB_PASS_COMPASS
console.log(DB_USER_COMPASS, DB_PASS_COMPASS)
*/

app.listen(port, () => {
  console.log(`Example app listening on port http://${HOST}:${port}`)
})
