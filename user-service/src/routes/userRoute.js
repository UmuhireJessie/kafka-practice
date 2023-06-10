import express from 'express';
import { addUser } from "../controller/userContoller";


const router = express.Router();

router.post('/user', addUser)

export default router;