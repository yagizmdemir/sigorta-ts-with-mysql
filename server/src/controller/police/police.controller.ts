import { Request, Response,  } from "express";
import { policeService } from "../../services/police/police.service";
const service = new policeService()

export const addMusteri = (req: Request, res: Response) => {
    const { fullname } = req.body 
    service.addMusteri(res, 'musteriler', fullname)
}

export const getPolice = (req: Request, res: Response) => {
    const { ad } = req.params
    service.getPolice(req, res, 'police', 'id', ad)
}

export const getAllPoliceler = (req: Request, res: Response) => {
    service.getAllPoliceler(req, res, 'police')
}

export const deleteMusteri = (req: Request, res: Response) => {
    const { ad } = req.params
    service.deleteMusteri(req, res, 'musteriler', 'id', ad )
}

export const updateUser = (req: Request, res: Response) => {
    
}