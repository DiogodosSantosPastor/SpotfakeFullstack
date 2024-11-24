import Express from "express";
import cors from "cors";
import {rotas} from "./roteamento/rotasAuth.js"
import { rotasUser } from "./roteamento/rotasUser.js";
import { criarTabelas } from "./db.js";

const app = Express()
app.use(Express.json())
app.use(cors())
//criarTabelas()

app.use('/autenticacao', rotas)
app.use('/pesquisa', rotasUser)

app.listen(8000)
