import { User } from "../model/User.mjs"
import { Setting } from "../model/Setting.mjs"
import { authentication } from "../config/jwt.mjs"
import { createSetting } from "../controller/SettingController.mjs"

import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
    try {

        const password = req.body.senha;

        const padraoEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

        if(!password || !req.body.email || !padraoEmail.test(req.body.email)){
            return res.status(500).json({ mensagem: "Email e/ou senha inválido(s)!" })   
        }

        const userExists = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(userExists) {
            return res.status(500).json({ mensagem: "O email informado não está disponível!" })   
        }

        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(password, salt);
        req.body.senha = hash;

        req.body.ativo = true;

        const user = await User.create(req.body);
        const jwt = authentication(user.id)

        const settingResponse = await createSetting(user.id, req.body.renda_fixa)
        return res.status(201).json({
            user,
            settingResponse,
            jwt
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(500).json({ mensagemAviso: "Email já está em uso" });
        } else {
            return res.status(500).json({ error: error.message });
        }
    }
}

export const inactivatedUser = async (req, res) => {
    try {
        const [updatedRows] = await User.update({
            ativo: false,
        },
            {
                where: {
                    id: req.params.id
                }
            })
        if (updatedRows) {
            res.status(200).send();
        } else {
            return res.status(404).send({ "Mensagem de Erro": "ID inválido" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        
        const setting = await Setting.update(req.body, {
            where: {
                usuarioID: req.params.id
            }
        })
     
        delete req.body.id;
        delete req.body.email;

        const user = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        })

        console.log(setting[0])

        return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getUserById = async (req, res) => {

    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })
        return user !== null ? res.status(200).json(user) : res.status(404).json({ mensagem: "Usuário não encontrado" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }

}

export const getAllUsers = async (req, res) => {

    try {
        const user = await User.findAll({
            where: {
              ativo: true
            },
            attributes: ['id','nome','email','data_nascimento', 'cep', 'cidade','estado','ativo' ]
          });
        return user !== null ? res.status(200).json(user) : res.status(404).json({ mensagem: "Não foram encontrados Usuários" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }

}

export const login = async (req, res) => {
    try {
        const {email, senha} = req.body;
        
        
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        
        if(!user){
            return res.status(500).json({ mensagem: "Email e/ou senha inválido(s)!" })   
        }
        const isValid = await bcrypt.compare(senha.toString(), user.senha.toString())
        if(!isValid){
            return res.status(500).json({ mensagem: "Email e/ou senha inválido(s)!" }) 
        }
        
        if(!user.ativo){
            await User.update({
                ativo: true,
            },
            { where: { email: email }})
        }
        const jwt = authentication(user.id)
        //createSetting(user.id)
        return res.status(200).json({
            jwt,
            user
        });
    } catch (err){
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getUsersWithTheirsSettingsById = async (req, res) => {

    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            include: Setting,
            attributes: ['id','nome','email','data_nascimento', 'cep', 'cidade','estado','ativo' ]
        })
        return user !== null ? res.status(200).json(user) : res.status(404).json({ mensagem: "Usuário não encontrado" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const updateUserPassword = async (req, res) => {

    try {

        const {email, nova_senha, senha_atual} = req.body;
        const padraoEmail = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/);

        if(!email){
            return res.status(500).json({ mensagem: "O email é obrigatório!" }) 
        }
        if(!padraoEmail.test(email)) {
            return res.status(500).json({ mensagem: "Email inválido!" }) 
        }
        
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if(!senha_atual){
            return res.status(500).json({ mensagem: "A senha atual é obrigatória!" }) 
        }
        if(!nova_senha){
            return res.status(500).json({ mensagem: "A nova senha é obrigatória!" }) 
        }

        const isValid = await bcrypt.compare(senha_atual, user.senha.toString())
        if(!isValid){
            return res.status(500).json({ mensagem: "Senha inválida!" }) 
        }

        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(nova_senha.toString(), salt);

        req.body = {"senha": hash}
        const userUpdated = await User.update(req.body, {
            where: {
                email: email
            }
        })
        return userUpdated >= 1 ? res.status(200).json({ mensagem: 'Senha atualizada com sucesso.' }) : res.status(500).json({ mensagem: 'Ocorreu um erro ao tentar atualizar a senha' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}
