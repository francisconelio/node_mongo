import { Usuario } from "../models/Usuario.js"
import moment from "moment/moment.js"

class UsuarioController {


    static inserir = async (req, res) => {

        //desestrutruração do body para acessar os atributos
        const { nome, idade, ativo, email } = req.body;

        
        // crio o ojeto usuario copiado do objeto body
        const usuario = { nome, idade, ativo, email }

        Object.keys(usuario).map(key =>{console.log('chave:',key,'valor:', usuario[key])

        if(usuario[key]) {
            console.log('validar');
            res.status(422).json(`o campo ${key}, é vazio`);
            //interrompe a criação, ou seja, abaixo dele não executa a inserção
            return;
        }

        })


        //cria o usuario atraves do mongoose
        const usuarioDB = await Usuario.create(usuario)
        res.status(201).json({
            data: usuarioDB,
            msg: 'usuário criado com sucesso!'
        });
    };

    static atualizar = async (req, res) => {
        const id = req.params.id

        //desestrutruração do body para acessar os atributos
        const { nome, idade, ativo, email } = req.body;

        // crio o ojeto usuario copiado do objeto body
        const usuario = { nome, idade, ativo, email }

       const updateUsuario = await Usuario.updateOne({ _id: id }, usuario)
       console.log(updateUsuario)

       if(updateUsuario.matchedCount === 0) {
        res.status(422).json(`Usuário ${usuario.nome} não foi atualizado!`)
    }
    res.status(204).json('Usuário atualizado com sucesso!')
    };

    // Buscar usuários
    static buscarTodos = async (req, res) => {
        const usuarios = await Usuario.find()
        res.status(200).json(usuarios)
    }

    //buscar por id
    static buscarPorId = async (req, res) => {
        const id = req.params.id

        if(id.length<24 || id.length>24) {
            res.status(422).json({message: 'Tamanho inváido do Id!'})
            return
        }
        const usuario = await Usuario.findOne({ _id: id });

        if(!usuarioDB){
            res.status(422).json({message: "Usuário não encontrado!"});
            return;
        }

        console.log(usuario)

        if(!usuario){
      
        res.status(422).json({message: 'Usuário não encontrado'})
        return
    }
    res.status(200).json(usuario);
    };


    static deletarUsuario = async (req, res) => {
        const id = req.params.id
        const usuario = await Usuario.findOne({ _id: id })
        res.status(200).json(usuario)
        console.log(`O usuário ${nome} foi excluído com sucesso às data/hora `)

    }

    //Criar a rota apagar no Node.js
    static excluir = async (req, res) => {
        const id = req.params.id

        //Busca o usuário, antes de deletar, com as suas informações
        const usuarioDB = await Usuario.findOne({ _id: id });

        // Deleta o usuário do banco
        await Usuario.deleteOne({ _id: usuarioDB.id });

        //Pego a data atual, new Date(), e formato
        let date = moment(new Date()).format("DD/MM/YYYY hh:mm:ss");

        //Mensagem para exibir
        let msg = `O usuário ${usuarioDB.nome} foi excluído com sucesso às ${date}`
        res.status(200).json({
            data: usuarioDB,
            msg
        })

    }

}

export default UsuarioController