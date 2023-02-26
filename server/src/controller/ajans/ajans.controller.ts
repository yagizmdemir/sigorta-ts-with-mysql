import { Request, Response,  } from "express";
import { AjansService } from "../../services/ajans/ajans.service";
const service = new AjansService()


export const getAjans = (req: Request, res: Response) => {
    const { ad } = req.params
    service.getAjans(req, res, 'ajanslar', 'ad', ad)
}

export const getAllAjans = (req: Request, res: Response) => {
    service.getAllajans(req, res, 'ajanslar')
}

export const deleteAjans = (req: Request, res: Response) => {
    const { id } = req.params
    service.deleteAjans(req, res, 'ajanslar', 'id', id )
}

export const updateAjans = (req: Request, res: Response) => {
    const { id } = req.params
    service.updateAjans( req, res, 'ajanslar',id )
}
