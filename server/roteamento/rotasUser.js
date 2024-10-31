//Criar rotas para listar todos os usuários
import express from "express"
import { Allusuario, Oneusuario } from "../controlador/UserCont.js"

const rotasUser = express.Router()

rotasUser.get('/user', Allusuario )

rotasUser.get('/oneuser', Oneusuario )

export {rotasUser}