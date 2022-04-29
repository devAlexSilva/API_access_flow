import express from 'express'
import { User } from '../controllers/UserController.js'
import { middleware } from '../controllers/middleware.js'


const user = express.Router();
user.use(middleware);

user.get('/', async (req, res) => {
    const userLogged = await new User().read(req.baseUrl);
    //essa baseUrl tá sendo setada pelo middleware e recebe o id do user no token
    return res.send(userLogged);
})


export { user }