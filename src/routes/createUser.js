import express from 'express'
import { User } from '../controllers/UserController.js'

const router = express.Router();

router.post('/create', async (req, res) => {
    const { name, email, password } = req.body;

    const dataUser = new User(name, email, password);

    try {
        const handleReturn = await dataUser.create();
        return res.send(handleReturn);
    } catch (err) {
        res.status(400).json({ message: `${err}` })
    }
});


export { router }