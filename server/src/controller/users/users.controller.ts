import { Request, Response,  } from "express";
import { UserService } from "../../services/users/users.service";
const service = new UserService()

export const addUser = (req: Request, res: Response) => {
    const { user } = req.body 
    service.addUser(res, 'kullanicilar', user)
}

export const getUser = (req: Request, res: Response) => {
    const { id } = req.params
    service.getUser(req, res, 'kullanicilar', 'id', id)
}

export const getAllUsers = (req: Request, res: Response) => {
    service.getUsers(req, res, 'kullanicilar')
}

export const deleteUsers = (req: Request, res: Response) => {
    const { id } = req.params
    service.deleteUser(req, res, 'kullanicilar', 'id', id )
}

export const updateUser = (req: Request, res: Response) => {
    
}