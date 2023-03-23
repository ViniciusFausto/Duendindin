import { Expense } from '../model/Expense.mjs'
import { Category } from '../model/Category.mjs'

import { verifyIsNull } from '../helpers/MainHelper.mjs'


export const getAllExpenses = async (req, res) => {
    try {
        const allExpenses = await Expense.findAll()

        return allExpenses !== null ? res.status(200).json(allExpenses) : res.status(404).json({ mensagem: "Não encontrado" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getExpense = async (req, res) => {
    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código do vencimento é obrigatório!' });
        }

        const expense = await Expense.findOne({
            where: {
                id: req.params.id
            }
        })

        return expense !== null ? res.status(200).json(expense) : res.status(404).json({ mensagem: "Vencimento não encontrado!" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllExpensesFromCategory = async (req, res) => {

    try {

        if(!req.params['idCategoria']) {
            return res.status(404).json({ mensagem: 'O código da categoria é obrigatório!' });
        }

        const expenses = await Expense.findAll({
            where: {
                categoriaID: req.params.idCategoria
            }
        })

        return expenses !== null ? res.status(200).json(expenses) : res.status(404).json({ mensagem: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getExpenseFromCategory = async (req, res) => {
    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código do vencimento é obrigatório!' });
        }

        if(!req.params['idCategoria']) {
            return res.status(404).json({ mensagem: 'O código da categoria é obrigatório!' });
        }

        const expense = await Expense.findOne({
            where: {
                id: req.params.id,
                categoriaID: req.params.idCategoria
            }
        })

        return expense !== null ? res.status(200).json(expense) : res.status(404).json({ mensagem: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllExpensesFromUser = async (req, res) => {
    try {

        if(!req.params['idUsuario']) {
            return res.status(404).json({ mensagem: 'O usuário precisa estar logado para obter os vencimentos!' });
        }

        const expenses = await Expense.findAll({
            include: [{
                model: Category,
                where: {
                    usuarioID: req.params['idUsuario']
                },
                order: [
                    ['data']
                ]
            }]
        })

        const groupedExpenses = expenses.reduce((groups, item) => {
            const group = (groups[item.data] || []);
            group.push(item);
            groups[item.data] = group;
            return groups;
          }, {});

        const mapReturn = Object.entries(groupedExpenses).map(item => {
            return {
                data: item[0],
                itens: item[1]
            }
        });

        return expenses !== null ? res.status(200).json(mapReturn) : res.status(404).json({ mensagem: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const updateExpensePaid = async (req, res) => {

    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código do vencimento é obrigatório!' });
        }

        const expense = await Expense.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!expense) {
            return res.status(404).json({ mensagem: 'Vencimento não encontrado' });
        }

        await expense.update({pago: !expense.pago});

        return res.status(200).json({ mensagem: 'Vencimento atualizado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const updateExpense = async (req, res) => {
    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código do vencimento é obrigatório!' });
        }

        const expense = await Expense.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!expense) {
            return res.status(404).json({ mensagem: 'Vencimento não encontrado' });
        }

        if(!req.body['nome']) {
            return res.status(404).json({ mensagem: 'O nome é obrigatório!' });
        }

        if(!req.body['categoriaID']) {
            return res.status(404).json({ mensagem: 'A categoria é obrigatória!' });
        }

        const category = await Category.findOne({
            where: {
                id: req.body.categoriaID
            }
        })
        
        if(!category) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe!' });
        }

        if(!req.body.data) {
            return res.status(404).json({ mensagem: 'A data de vencimento é obrigatória!' });
        }

        if(!req.body.valor) {
            return res.status(404).json({ mensagem: 'O valor é obrigatório!' });
        }

        if (expense.valor !== req.body.valor) {
            const category = await Category.findOne({
                where: {
                    id: expense.categoriaID
                }
            })

            verifyIsNull(res, category)

            let calc = (new Number(category.valor) + new Number(expense.valor)) - new Number(req.body.valor)

            await category.update({
                valor: calc.toFixed(2)
            })
        }

        await expense.update(req.body)

        return res.status(200).json({ mensagem: 'Vencimento atualizado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const deleteExpense = async (req, res) => {
    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código do vencimento é obrigatório!' });
        }

        const expense = await Expense.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!expense){
            return res.status(404).json({ mensagem: "Vencimento não encontrado!"})
        }

        const category = await Category.findOne({
            where: {
                id: expense.categoriaID
            }
        })

        verifyIsNull(res, category)

        const calc = new Number(category.valor) + new Number(expense.valor)

        await expense.destroy()

        await category.update({
            valor: calc.toFixed(2)
        })

        return res.status(200).json({ mensagem: 'Vencimento excluído com sucesso' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const createExpense = async (req, res) => {
    try {

        if(!req.body['nome']) {
            return res.status(404).json({ mensagem: 'O nome é obrigatório!' });
        }

        if(!req.body['categoriaID']) {
            return res.status(404).json({ mensagem: 'A categoria é obrigatória!' });
        }

        const category = await Category.findOne({
            where: {
                id: req.body.categoriaID
            }
        })
        
        if(!category) {
            return res.status(404).json({ mensagem: 'A categoria informada não existe!' });
        }

        if(!req.body.data) {
            return res.status(404).json({ mensagem: 'A data de vencimento é obrigatória!' });
        }

        if(!req.body.valor) {
            return res.status(404).json({ mensagem: 'O valor é obrigatório!' });
        }

        const expense = await Expense.create({...req.body, pago: false})

        const calc = new Number(category.valor) - new Number(expense.valor)

        await category.update({
            valor: calc.toFixed(2)
        })

        return res.status(200).json(expense)

    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}