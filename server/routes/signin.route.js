
import { Router } from "express";
import controller from "../controllers/signin.controller.js"

const router =  Router();

router.post('/',controller)

export default router;

