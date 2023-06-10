import express from 'express';
import { addPost } from "../controller/postController";


const router = express.Router();

router.post('/post', addPost)

export default router;