import express from 'express'
import { User } from '../controllers/UserController.js'

const router = express.Router();

router.post('/create', async (req, res) => {
    const dataUser = new User(req.body);
    const handleReturn = await dataUser.create();
    return res.send(handleReturn);
});


export { router }