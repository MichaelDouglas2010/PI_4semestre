import { Request, Response } from "express";
import Machi from "../../models/machi.entity";
import { error } from "console";
import { json } from "stream/consumers";


export default class MachiControllers{
    static async store(req:Request,res: Response){
        const{name, status} = req.body
        const {userId} = req.headers

        if(!userId) res.status(401).json({error:`Usuário não autenticado`})

        if(!name) res.status(400).json({error:`Nome não informado`})

        if(!status) res.status(400).json({error:`Status não informado`})

        const machi = new Machi()
        machi.name = name
        machi.status = status
        machi.userId = Number(userId)
        await machi.save()

        return res.status(201).json(machi)
    }

    static async index(req:Request, res:Response){
        const machis = await Machi.find()
        return res.json(machis)
    }

    static async show(req:Request, res:Response){
        const {id} = req.params
        const {userId} = req.headers

        if(!userId) res.status(401).json({error:`Usuário não autenticado`})
        
        if(!id || isNaN(Number(id))){
            return res.status(400).json({error:`O id e obrigatório`})
        }
        const machi = Machi.findOneBy({id: Number(id), userId: Number(userId)})
        return res.json(machi)
    }

    static async delete(req:Request, res:Response){
        const {id} = req.params
        const {userId} = req.headers

        if(!id || isNaN(Number(id))){
            return res.status(400).json({error:`O id é obrigatório`})
        }
        if(!userId) return res.status(401).json({error:`Usuário não autenticado`})

        const machi = await Machi.findOneBy({id:Number(id), userId:Number(userId)})

        if(!machi){ 
            return res.status(404).json({error:`Maquina não encontrada`})
        }
    
        await machi.remove()
        return res.status(204).json()
    }

    static async update(req:Request, res:Response){
        const {id} = req.params
        const {name, status} = req.body
        const {userId} = req.headers

        if(!id || isNaN(Number(id))){
            return res.status(400).json({error:`O id é obrigatório`})
        }
        if(!userId) return res.status(401).json({error:`Usuário não autenticado`})
            
        const machi = await Machi.findOneBy({id:Number(id), userId:Number(userId)})

        if(!machi){
            return res.status(404).json({error:`Maquina não encontrada`})
        }
        machi.name = name
        machi.status = (status === undefined) ? machi.status : status
        await machi.save()

        return res.json(machi)

        

    }


}