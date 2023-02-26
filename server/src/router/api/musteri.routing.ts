import { Router } from "express";
import { addMusteri, getAllMusteri, getMusteri, deleteMusteri,} from "../../controller/musteri/musteri.controller";
const router = Router();

router.post('/musteri', addMusteri);
//router.put('/ajans/:id', updateAjans);
router.delete('/musteri/:ad', deleteMusteri);
router.get('/musteri/:ad', getAllMusteri);
router.get('/musteri/:ad', getMusteri);

export default router;