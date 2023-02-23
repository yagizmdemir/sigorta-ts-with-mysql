import { Router } from "express";
import { registerRepresent } from "../../controller/represents/represents.controller";
const router = Router();

router.post('/register', registerRepresent);

export default router;
