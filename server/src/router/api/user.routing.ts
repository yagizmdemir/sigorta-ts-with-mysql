import { Router } from "express";
import { addUser, deleteUsers, getUsers, getUser, updateUser } from "../../controller/users/users.controller";
import { addUserMiddleware } from "../../middleware/user.middleware";
const router = Router();

router.post('/users',addUserMiddleware, addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUsers);
router.get('/users', getUsers);
router.get('/users/:id', getUser);

export default router;