//Criar um controlador para listar todos os usuários
import { User } from "../db.js";

const Allusuario = async (req, res) => {
    const listaUsuarios = await User.findAll();
    res.send(listaUsuarios)
}

const Oneusuario = async (req, res) => {
    const {email} = req.body
    if(!email){
        res.send('Insira o email do usuario que você deseja pesquisar')
        return
    }
    const findUsuario = await User.findOne({ where: { email: email } })
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

const trocarSenha = async (req, res) => {
    const { email, senhaAntiga, novaSenha } = req.body;
  
   
    if (!email || !senhaAntiga || !novaSenha) {
      res.send('Você deve preencher todos os campos');
      return;
    }
  
    const userExiste = await User.findOne({ where: { email: email } });
    if (!userExiste) {
      res.send('Este usuário não existe');
      return;
    }
  
    const senhaValida = bcryptjs.compareSync(senhaAntiga, userExiste.senha);
    if (!senhaValida) {
      res.send('Senha antiga incorreta');
      return;
    }
  
    const novaSenhaCriptografada = bcryptjs.hashSync(novaSenha, 10);
  
    await User.update(
      { senha: novaSenhaCriptografada },
      { where: { email: email } }
    );
  
    res.send('Senha alterada com sucesso');
  };

export {Allusuario, Oneusuario, Deletaruser, trocarSenha }
