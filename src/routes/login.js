import express from 'express'
import { Login } from '../controllers/LoginController.js'


const login = express.Router();

login.post('/login', async(req, res) => {
    const handleLogin = new Login(req.body);
    return res.send(await handleLogin.tryLogin());
})

export { login }