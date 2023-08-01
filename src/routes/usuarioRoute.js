import express from 'express'
import UsuarioController from '../controllers/usuarioController.js';

const routerUsuario = express.Router();

routerUsuario
    .get('/usuarios', UsuarioController.buscarTodos)
    .get('/usuarios/:id', UsuarioController.buscarPorId)
    .post('/usuarios', UsuarioController.inserir)
    .put('/usuarios/:id', UsuarioController.atualizar)
    .delete('/usuarios/:id', UsuarioController.excluir)

export default routerUsuario