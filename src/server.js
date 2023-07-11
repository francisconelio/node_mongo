//const express = require('express')
import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
const app = express()

const HOST = 'localhost'
const port = 5000

// endpoint inicial
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

console.log(DB_USER,DB_PASS)

//Conectando no banco Mongo Atlas
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.qprbpqk.mongodb.net/usuario?retryWrites=true&w=majority`)
.then(()=>{
    console.log('BD conectado com sucesso')
})
.catch(error => {
    console.log('Erro ao conectar no BD', error)
})
app.listen(port, () => {
  console.log(`Example app listening on port http://${HOST}:${port}`)
})
