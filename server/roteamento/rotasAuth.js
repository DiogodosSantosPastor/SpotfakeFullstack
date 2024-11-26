import express from "express";
import {registro, login, trocarSenha} from '../controlador/AuthCont.js'



const rotas = express.Router()

rotas.post('/registro', registro )

rotas.post('/login', login)

rotas.put('/trocasenha', trocarSenha)

export { rotas }
