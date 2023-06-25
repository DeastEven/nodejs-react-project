import {Router} from "express";
const router = new  Router()
import deviceController from "../controllers/deviceController.js";

router.post('/',)
router.get('/',)
router.get('/:id',deviceController.getOne)

export default router
