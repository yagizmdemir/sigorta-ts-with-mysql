import { Router } from "express";
import { addUser, deleteUsers, getAllUsers, getUser, updateUser } from "../../controller/users/users.controller";
const router = Router();

router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUsers);
router.get('/users', getAllUsers);
router.get('/users/:id', getUser);

export default router;
