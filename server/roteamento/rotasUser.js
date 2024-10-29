//Criar rotas para listar todos os usuários
import express from "express"
import { usuarios } from "../controlador/UserCont.js"

const rotasUser = express.Router()

rotasUser.get('/', registro )