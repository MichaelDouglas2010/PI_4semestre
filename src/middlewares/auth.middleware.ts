import { Request, Response, NextFunction } from "express";
import Token from "../models/token.entity";

export default async function authMiddleware(req:Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers

    if(!authorization) return res.status(401).json({error:`Token não informado`})

    //Verifique se o token existe
    const userToken = await Token.findOneBy({token:authorization})

    if(!userToken) return res.status(401).json({error:`Token inválido`})

    if(userToken.expiresAt < new Date()){
        await userToken.remove()
        return res.status(401).json({error:`Token expirado`})
    }

    //Adicionando o id ao header da requisição
    req.headers.userId = userToken.userId.toString()

    //continua a Exec
    next()

}