import express  from "express";
import { signUpApi } from "../controllers/user-controller.js";


const router = express.Router();

router.post('/signup', signUpApi);


export default router;