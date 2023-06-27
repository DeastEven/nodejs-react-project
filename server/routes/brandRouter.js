import {Router} from "express";
const router = new  Router()

import brandRouter from "../controllers/brandController.js";

router.post('/',brandRouter.create)
router.get('/',brandRouter.getAll)

export default router
