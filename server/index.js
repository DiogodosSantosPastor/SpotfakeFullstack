import Express from "express";
import cors from "cors";
import { rotas } from "./roteamento/rotasAuth.js"
import { rotasUser } from "./roteamento/rotasUser.js";
import { rotasArt } from "./roteamento/rotasArt.js";
import { criarTabelas } from "./db.js";
import { adicionarDados } from "./data.js"

const app = Express()
app.use(Express.json())
app.use(cors())
//criarTabelas()
//adicionarDados()

app.use('/autenticacao', rotas)
app.use('/pesquisa', rotasUser)
app.use('/art', rotasArt)

app.listen(8000)
