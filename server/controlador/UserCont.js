//Criar um controlador para listar todos os usuários
import { User } from "../db.js";

const Allusuario = async (req, res) => {
    const listaUsuarios = await User.findAll();
    res.send(listaUsuarios)
}

const Oneusuario = async (req, res) => {
    const data = req.body
    if(!data.email){
        res.send('Insira o email do usuario que você deseja pesquisar')
        return
    }
    const findUsuario = await User.findOne({ where: { email: data.email }, attributes: ['nome', 'sobreNome', 'email', 'status', 'dataNascimento', 'foto'] })
    res.send(findUsuario)
}

const Deletaruser = async (req, res) => {
    const { email } = req.body

    if (!email) {
        res.send('Insira o email do usuário na qual você gostaria de deletar.');
        return
    }
    
    const ByeUser = await User.destroy({ where: { email: email } })
    if (ByeUser) {
        res.send("Usuário deletado");
    } else {
        res.send("Usuário não encontrado.");
    }
}

const SaveProfilePic = async (req, res) => {
    try {
        const data = req.body
        const user = await User.findOne({ where: { email: data.email } })
        if (!user) {
            return res.send("Usuário não encontrado.")
        }

        console.log(data.foto)
        const update = await User.update({ foto: data.foto }, { where: { email: data.email } })
        res.send('Foto de perfil atualizada com sucesso.')
    } catch (error) {
        console.log(error)
    }
    
}

export {Allusuario, Oneusuario, Deletaruser, SaveProfilePic }
