import { Router } from "express";
import { getPolice, getAllPoliceler} from "../../controller/police/police.controller";
const router = Router();

router.post('/musteri', addMusteri);
//router.put('/ajans/:id', updateAjans);
router.delete('/musteri/:ad', deleteMusteri);
router.get('/police/:ad', getAllPoliceler);
router.get('/police/:ad', getPolice);

export default router;