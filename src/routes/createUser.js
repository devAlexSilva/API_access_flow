import express from 'express'
import { User } from '../controllers/UserController.js'

const router = express.Router();

router.post('/create', async (req, res) => {
    const { name, email, password } = req.body;
    
    const dataUser = new User(name, email, password);
    const handleReturn = await dataUser.create();
    return res.send(handleReturn);
});


export { router }