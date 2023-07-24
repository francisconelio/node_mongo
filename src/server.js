//const express = require('express')
import express from 'express'
import mongoose from 'mongoose'
import moment from 'moment'
import 'dotenv/config'
import { Usuario } from './models/Usuario.js'

const app = express();

app.use(express.urlencoded({
  extended: true,
})),

  app.use(express.json())



const HOST = 'localhost'
const port = 5000

// endpoint inicial

app.get('/', (req, res) => {
  res.send({
    msg: "Servidor rodando!",
    codigo: 200
  });
});

//endpoints do Usuário

app.post('/usuario', async (req, res) => {
  /*const body = {
   /* nome: req.body.nome,
    idade: req.body.idade*/

  //desestrutruração do body para acessar os atributos
  const { nome, idade, ativo, email } = req.body;

  // crio o ojeto usuario copiado do objeto body
  const usuario = { nome, idade, ativo, email }

  //cria o usuario atraves do mongoose
  const usuarioDB = await Usuario.create(usuario)
  res.status(201).json({
    data: usuarioDB,
    msg: 'usuário criado com sucesso!'
  })
})

app.put('usuario/:id', async (req, res) => {
  const id = req.params.id

   //desestrutruração do body para acessar os atributos
   const { nome, idade, ativo, email } = req.body;

   // crio o ojeto usuario copiado do objeto body
   const usuario = { nome, idade, ativo, email }
 
   await Usuario.updateOne({ _id: id }, usuario)
   res.status(204).json('Usuário atualizado com sucesso!')
})

// Buscar usuários
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find()
  res.status(200).json(usuarios)
})

app.get('/usuario/:id', async (req, res) => {
  const id = req.params.id
  const usuario = await Usuario.findOne({ _id: id })
  res.status(200).json(usuario)

})

app.delete('/usuario:id', async (req, res) => {
  const id = req.params.id
  const usuario = await Usuario.findOne({ _id: id })
  res.status(200).json(usuario)
  console.log(`O usuário ${nome} foi excluído com sucesso às data/hora `)

})

//Criar a rota apagar no Node.js
app.delete("/usuario/:id", async (req, res) => {
  const id = req.params.id

  //Busca o usuário, antes de deletar, com as suas informações
  const usuarioDB = await Usuario.findOne({ _id: id })

  // Deleta o usuário do banco
  await Usuario.deleteOne({ _id: usuarioDB.id })

  //Pego a data atual, new Date(), e formato
  let date = moment(new Date()).format("DD/MM/YYYY hh:mm:ss");

  //Mensagem para exibir
  let msg = `O usuário ${usuarioDB.nome} foi excluído com sucesso às ${date}`
  res.status(200).json({
    data: usuarioDB,
    msg
  })

})

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS

console.log('acesso', DB_USER, DB_PASS)

const DB_USER_COMPASS = process.env.DB_USER_COMPASS
const DB_PASS_COMPASS = process.env.DB_PASS_COMPASS
console.log(DB_USER_COMPASS, DB_PASS_COMPASS)

//Conectando no banco Mongo Atlas
mongoose.connect(
  //'mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT'
  /*Mongo Atlas*/
  `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.qprbpqk.mongodb.net/dc_fs12?retryWrites=true&w=majority`
)
  .then(() => {
    console.log('BD conectado com sucesso')
  })
  .catch(error => {
    console.log('Erro ao conectar no BD', error)
  })
app.listen(port, () => {
  console.log(`Example app listening on port http://${HOST}:${port}`)
})
