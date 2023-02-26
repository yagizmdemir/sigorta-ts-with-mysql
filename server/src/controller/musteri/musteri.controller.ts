import { Request, Response,  } from "express";
import { musteriService } from "../../services/musteri/musteri.service";
const service = new musteriService()

export const addMusteri = (req: Request, res: Response) => {
    const { fullname } = req.body 
    service.addMusteri(res, 'musteriler', fullname)
}

export const getMusteri = (req: Request, res: Response) => {
    const { ad } = req.params
    service.getMusteri(req, res, 'musteriler', 'id', ad)
}

export const getAllMusteri = (req: Request, res: Response) => {
    service.getAllMusteri(req, res, 'musteriler')
}

export const deleteMusteri = (req: Request, res: Response) => {
    const { ad } = req.params
    service.deleteMusteri(req, res, 'musteriler', 'id', ad )
}

export const updateUser = (req: Request, res: Response) => {
    
}