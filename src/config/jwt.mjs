
import 'dotenv/config'
import jsonwebtoken from "jsonwebtoken";

export const PRIVATE_KEY = 'dev'

export const authentication = (userId) => {
    const jwt = jsonwebtoken.sign({id: userId}, PRIVATE_KEY)

    return jwt
}

export const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token']
    if(!token) return res.status(401).send({auth: false, message: 'Não foi fornecido um token de acesso.'})
    jsonwebtoken.verify(token, PRIVATE_KEY, function(err, decoded) {
        if(err) return res.status(500).send({auth: false, message: 'Falha ao autenticar o token'})

        req.userId = decoded.id
        next();
    })
}

export const logout = (req, res, next) => {
    res.json({token: null, refreshToken: null})
}

