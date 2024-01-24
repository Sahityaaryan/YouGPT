

import { Router } from "express";
import controller from "../controllers/register.controller.js"

const router =  Router();


router.post('/',controller)

export default router;