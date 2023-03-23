import { Gain } from '../model/Gain.mjs'
import { Category } from '../model/Category.mjs'

import { verifyIsNull } from '../helpers/MainHelper.mjs'


export const getAllEarnings = async (req, res) => {
    try {
        const allEarnings = await Gain.findAll()

        return allEarnings !== null ? res.status(200).json(allEarnings) : res.status(404).json({ mensagem: "Não encontrado" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllEarningsFromUser = async (req, res) => {

    try {

        if(!req.params['idUsuario']) {
            return res.status(404).json({ mensagem: 'O usuário precisa estar logado para obter os recebimentos!' });
        }

        const gains = await Gain.findAll({
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

        const groupedGains = gains.reduce((groups, item) => {
            const group = (groups[item.data] || []);
            group.push(item);
            groups[item.data] = group;
            return groups;
          }, {});

          const mapReturn = Object.entries(groupedGains).map(item => {
            return {
                data: item[0],
                itens: item[1]
            }
          });

        return gains !== null ? res.status(200).json(mapReturn) : res.status(404).json({ mensagem: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }

}

export const getGain = async (req, res) => {
    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código do recebimento é obrigatório!' });
        }

        const gain = await Gain.findOne({
            where: {
                id: req.params.id
            }
        })

        return gain !== null ? res.status(200).json(gain) : res.status(404).json({ mensagem: "Não encontrado" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllEarningsFromCategory = async (req, res) => {
    try {

        if(!req.params['idCategoria']) {
            return res.status(404).json({ mensagem: 'O código da categoria é obrigatório!' });
        }

        const earnings = await Gain.findAll({
            where: {
                categoriaID: req.params.idCategoria
            }
        })

        return earnings !== null ? res.status(200).json(earnings) : res.status(404).json({ mensagem: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getGainFromCategory = async (req, res) => {
    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código do recebimento é obrigatório!' });
        }

        if(!req.params['idCategoria']) {
            return res.status(404).json({ mensagem: 'O código da categoria é obrigatório!' });
        }

        const gain = await Gain.findOne({
            where: {
                id: req.params.id,
                categoriaID: req.params.idCategoria
            }
        })

        return gain !== null ? res.status(200).json(gain) : res.status(404).json({ mensagem: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const updateGain = async (req, res) => {
    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código do recebimento é obrigatório!' });
        }

        const gain = await Gain.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!gain) {
            return res.status(404).json({ mensagem: 'Recebimento não encontrado' });
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
            return res.status(404).json({ mensagem: 'A data de recebimento é obrigatória!' });
        }

        if(!req.body.valor) {
            return res.status(404).json({ mensagem: 'O valor é obrigatório!' });
        }

        if (gain.valor !== req.body.valor) {
            const category = await Category.findOne({
                where: {
                    id: gain.categoriaID
                }
            })

            verifyIsNull(res, category)

            let calc = (new Number(category.valor) - new Number(gain.valor)) + new Number(req.body.valor)

            await category.update({
                valor: calc.toFixed(2)
            })
        }

        await gain.update(req.body)

        return res.status(200).json({ mensagem: 'Recebimento atualizado com sucesso!' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const deleteGain = async (req, res) => {
    try {

        if(!req.params['id']) {
            return res.status(404).json({ mensagem: 'O código do recebimento é obrigatório!' });
        }

        const gain = await Gain.findOne({
            where: {
                id: req.params.id
            }
        })

        if(!gain){
            return res.status(404).json({ mensagem: "Recebimento não encontrado!"})
        }

        const category = await Category.findOne({
            where: {
                id: gain.categoriaID
            }
        })

        verifyIsNull(res, category)

        const calc = new Number(category.valor) - new Number(gain.valor)

        await gain.destroy()

        await category.update({
            valor: calc.toFixed(2)
        })

        return res.status(200).json({ mensagem: 'Ganho deletado com sucesso' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const createGain = async (req, res) => {
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
            return res.status(404).json({ mensagem: 'A data de recebimento é obrigatória!' });
        }

        if(!req.body.valor) {
            return res.status(404).json({ mensagem: 'O valor é obrigatório!' });
        }

        const gain = await Gain.create(req.body)

        const calc = new Number(category.valor) + new Number(gain.valor)

        await category.update({
            valor: calc.toFixed(2)
        })

        return res.status(200).json(gain)

    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}