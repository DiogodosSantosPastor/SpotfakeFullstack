//Criar um controlador para listar todos os usuários
import { User } from "../db.js";

const usuarios = async (res) => {
    const listaUsuarios = await User.findAll();
    res.send(listaUsuarios)
}

export {usuarios}
