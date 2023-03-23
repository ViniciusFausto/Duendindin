export const verifyIsNull = (res, variable) => {
    if (variable === null) {
        return res.status(404).json({ mensagem: 'Não encontrado' })
    }
}

export const verifyPeriodIsNull = (res, startDate, endDate) => {
    if (!startDate) {
        return res.status(404).json({ mensagem: 'Preencha a data inicial!' })
    }

    if (!startDate) {
        return res.status(404).json({ mensagem: 'Preencha a data final!' })
    }
}