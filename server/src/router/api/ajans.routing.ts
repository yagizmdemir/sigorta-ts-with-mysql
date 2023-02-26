import { Router } from "express";
import { getAllAjans, getAjans, updateAjans, deleteAjans,} from "../../controller/ajans/ajans.controller";
const router = Router();

router.put('/ajans/:id', updateAjans);
router.delete('/ajans/:id', deleteAjans);
router.get('/ajans/:ad', getAllAjans);
router.get('/ajans/:ad', getAjans);

export default router;