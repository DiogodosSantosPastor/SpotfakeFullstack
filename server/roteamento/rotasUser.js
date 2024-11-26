//Criar rotas para listar todos os usuários
import express from "express"
import { Allusuario, Oneusuario, Deletaruser } from "../controlador/UserCont.js"

const rotasUser = express.Router()

rotasUser.get('/user', Allusuario )

rotasUser.get('/oneuser', Oneusuario )

rotasUser.delete('/delete', Deletaruser)


export {rotasUser}