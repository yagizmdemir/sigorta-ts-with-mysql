import { Request, Response,  } from "express";
import { RepresentService } from "../../services/represents/represents.service";

const service = new RepresentService();

export const registerRepresent = async (req: Request, res: Response) => {
    const { represent, ajans } = req.body;
    await service.register(req, res, 'satis_temsilcisi', represent, ajans)
}
