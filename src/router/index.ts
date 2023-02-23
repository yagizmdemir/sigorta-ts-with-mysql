import { Router } from "express";
import userRouter from './api/user.routing'
import representRouter from './api/represent.routing'
const router = Router();

router.use(userRouter);
router.use(representRouter);

export default router;
