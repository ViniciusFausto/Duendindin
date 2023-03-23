import { Category } from '../model/Category.mjs'
import { Gain } from '../model/Gain.mjs';
import { Expense } from '../model/Expense.mjs';
import { verifyIsNull } from '../helpers/MainHelper.mjs'

export const createCategory = async (req, res) => {
    try {

        if(!req?.body?.nome) {
            return res.status(404).json({ mensagem: 'O nome é obrigatório!' });
        }

        const categoryFound = await Category.findOne({
            where: {
                nome: req.body.nome,
                usuarioID: req.body.usuarioID
            }
        })

        if(categoryFound) {
            return res.status(404).json({ mensagem: 'O nome informado já está cadastrado!' });
        }

        const category = await Category.create(req.body)

        return res.status(201).json(category)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getUserCategory = async (req, res) => {
    try {

        if(!req.params['userId']) {
            return res.status(404).json({ mensagem: 'Para atualizar a categoria, o usuário deve estar logado!' });
        }

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código da categoria é obrigatório!' });
        }

        const category = await Category.findOne({
            where: {
                id: req.params['id'],
                usuarioID: req.params['userId']
            }
        })

        if (!category) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada!' })
        }

        return res.status(200).json(category)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllUserCategories = async (req, res) => {
    try {

        if(!req.params['userId']) {
            return res.status(404).json({ mensagem: 'Para atualizar a categoria, o usuário deve estar logado!' });
        }

        const categories = await Category.findAll({
            where: {
                usuarioID: req.params['userId']
            }
        })

        /*if (!categories === null) {
            return res.status(404).json({ mensagem: 'Não foram encontradas categorias com os dados informados!' })
        }*/

        return res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllSystemCategories = async (req, res) => {
    try {
        const allCategories = await Category.findAll();

        /*if (allCategories === null) {
            return res.status(404).json({ mensagem: 'Não foram encontradas categorias' })
        }*/

        return res.status(200).json(allCategories)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const updateCategory = async (req, res) => {
    try {

        if(!req.params['userId']) {
            return res.status(404).json({ mensagem: 'Para atualizar a categoria, o usuário deve estar logado!' });
        }

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código da categoria é obrigatório!' });
        }

        if(!req?.body?.nome) {
            return res.status(404).json({ mensagem: 'O nome da categoria é obrigatório!' });
        }

        const category = await Category.update(req.body, {
            where: {
                id: req.params['id'],
                usuarioID: req.params['userId']
            }
        })

        return (category) ? res.status(200).json({ mensagem: 'Categoria atualizada com sucesso!' }) : res.status(500).json({ mensagem: 'Não houve alterações no registro!'})

    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const deleteCategory = async (req, res) => {
    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código da categoria é obrigatório!' });
        }

        const category = await Category.findOne({
            where: {
                id: req.params.id,
                usuarioID: req.params.userId
            }
        })

        if(!category){
            return res.status(404).json({ mensagem: "Categoria não encontrada!"})
        }
        

        const earnings = await Gain.findAll({
            where: {
                categoriaID: category.id
            }
        })

        const expense = await Expense.findAll({
            where: {
                categoriaID: category.id
            }
        })

        if(earnings?.length || expense?.length){
            return res.status(401).json({ mensagem: 'Não é possível deletar a categoria, existem gastos e/ou ganhos vinculados a ela!'})
        }

        await category.destroy()

        return res.status(200).json({ mensagem: 'Categoria excluída com sucesso!' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}