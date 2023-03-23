import { Category } from '../model/Category.mjs'
import { Expense } from '../model/Expense.mjs'
import { Gain } from '../model/Gain.mjs'
import { Setting } from '../model/Setting.mjs'
import { User } from '../model/User.mjs'
import { dbConfig } from '../config/db.mjs'
import { verifyPeriodIsNull } from '../helpers/MainHelper.mjs'
import sequelize from 'sequelize';

export const getChart1 = async (req, res) => {
    try {
        
        const startDate = req.body.dataInicial;
        const endDate = req.body.dataFinal;
        const userId = req.body.idUsuario;

        if(!userId) {
            return res.status(500).json({ mensagem: "Autenticação é necessária!" })
        }

        verifyPeriodIsNull(res, startDate, endDate);

        const setting = await Setting.findOne({
            where: {
                usuarioID: userId
            }
        })

        const gain = await dbConfig.query(
            `select
                MONTH(gn.data) as mes,
                sum(gn.valor) + cf.renda_fixa as valor
            from
                ganho gn
                inner join categoria c on (c.id = gn.categoriaID)
                inner join configuracao cf on (c.usuarioID = cf.usuarioID)
            where 
                c.usuarioID = ${userId}
            and
                data >= '${startDate}' and data <= '${endDate}'
            group by MONTH(gn.data);`,
            { type: sequelize.QueryTypes.SELECT }
        )

        const expense = await dbConfig.query(
            `select
                MONTH(gn.data) as mes,
                sum(gn.valor) as valor
            from
                gasto gn
                inner join categoria c on (c.id = gn.categoriaID)
            where 
                c.usuarioID = ${userId}
            and
                data >= '${startDate}' and data <= '${endDate}'
            group by MONTH(gn.data);`,
            { type: sequelize.QueryTypes.SELECT }
        )

        const uniqueMonths = [...new Set([...gain.map(item => item.mes), ...expense.map(item => item.mes)])];

        const finalResult = {};

        uniqueMonths.forEach(month => {

            expense.forEach(item => {
                finalResult[item.mes] = {...finalResult[item.mes], gasto: Number(item.valor)};
            });
            
            if(!expense.map(item => item.mes).includes(month)) {
                finalResult[month] = {...finalResult[month], gasto: 0};
            }
        
           gain.forEach(item2 => {
                finalResult[item2.mes] = {...finalResult[item2.mes],ganho: Number(item2.valor)};
            });
            
            if(!gain.map(item2 => item2.mes).includes(month)) {
                finalResult[month] = {...finalResult[month], ganho: 0 + Number(setting.renda_fixa)};
            }
             
         });

        return res.status(200).json(finalResult)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getChart2 = async (req, res) => {
    try {
        
        const startDate = req.body.dataInicial;
        const endDate = req.body.dataFinal;
        const userId = req.body.idUsuario;

        if(!userId) {
            return res.status(500).json({ mensagem: "Autenticação é necessária!" })
        }

        verifyPeriodIsNull(res, startDate, endDate);

        const setting = await Setting.findOne({
            where: {
                usuarioID: userId
            }
        })

        const gain = await dbConfig.query(
            `select
                MONTH(gn.data) as mes,
                sum(gn.valor) + cf.renda_fixa as valor
            from
                ganho gn
                inner join categoria c on (c.id = gn.categoriaID)
                inner join configuracao cf on (c.usuarioID = cf.usuarioID)
            where 
                c.usuarioID = ${userId}
            and
                data >= '${startDate}' and data <= '${endDate}'
            group by MONTH(gn.data);`,
            { type: sequelize.QueryTypes.SELECT }
        )

        const expense = await dbConfig.query(
            `select
                MONTH(gn.data) as mes,
                sum(gn.valor) as valor
            from
                gasto gn
                inner join categoria c on (c.id = gn.categoriaID)
            where 
                c.usuarioID = ${userId}
            and
                data >= '${startDate}' and data <= '${endDate}'
            group by MONTH(gn.data);`,
            { type: sequelize.QueryTypes.SELECT }
        )

        const uniqueMonths = [...new Set([...gain.map(item => item.mes), ...expense.map(item => item.mes)])];

        const finalResult = {};

        uniqueMonths.forEach(month => {

            expense.forEach(item => {
                finalResult[item.mes] = {...finalResult[item.mes], gasto: Number(item.valor)};
            });
            
            if(!expense.map(item => item.mes).includes(month)) {
                finalResult[month] = {...finalResult[month], gasto: 0};
            }
        
           gain.forEach(item2 => {
                finalResult[item2.mes] = {...finalResult[item2.mes],ganho: Number(item2.valor)};
            });
            
            if(!gain.map(item2 => item2.mes).includes(month)) {
                finalResult[month] = {...finalResult[month], ganho: 0 + Number(setting.renda_fixa)};
            }
             
         });

        return res.status(200).json(finalResult)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getChart3 = async (req, res) => {
    try {
        
        const mes = req.body.mes;
        const ano = req.body.ano;
        const idUsuario = req.body.idUsuario;

        if(!idUsuario) {
            return res.status(500).json({ mensagem: "Autenticação é necessária!" })
        }

        if(!mes || mes == -1) {
            return res.status(500).json({ mensagem: "O mês é necessário!" })
        }

        if(!ano || ano == -1) {
            return res.status(500).json({ mensagem: "O ano é necessário!" })
        }

        const totalSalary = await dbConfig.query(
            `select
                cf.renda_fixa + sum(gn.valor) as renda_total_mes
            from
                ganho gn
                inner join categoria c on (c.id = gn.categoriaID)
                inner join configuracao cf on (cf.usuarioID = c.usuarioID)
            where
                cf.usuarioID =  ${idUsuario}
            and
                month(gn.data) = ${mes}
            and
                year(gn.data) = ${ano}
            group by
                month(gn.data);`,
            { type: sequelize.QueryTypes.SELECT }
        )

        const p50 = await dbConfig.query(
            `select
                month(gt.data) as mes,
                sum(gt.valor) as saldo
            from
                gasto gt
                inner join categoria c on (c.id = gt.categoriaID)
                inner join usuario u on (u.id = c.usuarioID)
            where
                u.id =  ${idUsuario}
            and
                gt.recorrente = '1'
            and
                month(gt.data) = ${mes}
            and
                year(gt.data) = ${ano}
            group by
                month(gt.data);`,
            { type: sequelize.QueryTypes.SELECT }
        )

        const p30 = await dbConfig.query(
            `select
                month(gt.data) as mes,
                sum(gt.valor) as saldo
            from
                gasto gt
                inner join categoria c on (c.id = gt.categoriaID)
                inner join usuario u on (u.id = c.usuarioID)
            where
                u.id =  ${idUsuario}
            and
                gt.recorrente = 0
            and
                month(gt.data) = ${mes}
            and
                year(gt.data) = ${ano}
            group by
                month(gt.data);`,
            { type: sequelize.QueryTypes.SELECT }
        )


        return res.status(200).json({
            totalSalary,
            p50,
            p30
        })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getChart4 = async (req, res) => {
    try {
        
        const startDate = req.body.dataInicial;
        const endDate = req.body.dataFinal;
        const idUsuario = req.body.idUsuario;

        if(!idUsuario) {
            return res.status(500).json({ mensagem: "Autenticação é necessária!" })
        }

        verifyPeriodIsNull(res, startDate, endDate);

        const chart = await dbConfig.query(
            `select distinct
                c.nome as nome,
                count(gt.id) + count(gn.id) as qtd
            from 
                categoria c
                left join gasto gt on (c.id = gt.categoriaID)
                left join ganho gn on (c.id = gn.categoriaID)
            where 
                c.usuarioID = ${idUsuario}
            and
                (
                    (gt.data between '${startDate}' and '${endDate}')
                        or
                    (gn.data between '${startDate}' and '${endDate}')
                )
            group by
                c.nome;`,
            { type: sequelize.QueryTypes.SELECT }
        )

        return res.status(200).json(chart)
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}