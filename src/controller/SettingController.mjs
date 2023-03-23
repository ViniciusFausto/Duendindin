import {Setting} from "../model/Setting.mjs"
import {authentication} from "../config/jwt.mjs"

export const createSetting = async (userId, rendaFixa) => {
    try {
        if(rendaFixa != undefined || rendaFixa != 0) {
            var rendaFixaUser = rendaFixa
        }
        let setting = {
            usuarioID:userId,
            renda_fixa:rendaFixaUser,
            limite_lazer:20,
            limite_contas:50,
            limite_investimento: 30
        };

        const settingResponse = await Setting.create(setting);
        return settingResponse;
    } catch (error) {
        return error.message;
    }
}


export const updateSetting = async (req, res) => {
    try {
        const setting = await Setting.findOne({
            where: {
                id: req.params.id
            }
        })

        await setting.update(req.body)

        return res.status(200).json({ mensagem: 'Configuração atualaizada com sucesso' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllSettingFromUser = async (req, res) => {
    try {
        const settings = await Setting.findAll({
            where: {
                usuarioID: req.params.userId
            }
        })

        return settings !== null ? res.status(200).json(settings) : res.status(404).json({ mensagem: 'Não encontrado' })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}

export const getAllSettings = async (req, res) => {
    try {
        const allSettings = await Setting.findAll()

        return allSettings !== null ? res.status(200).json(allSettings) : res.status(404).json({ mensagem: "Não encontrado" })
    } catch (err) {
        return res.status(500).json({ mensagem: err.message })
    }
}