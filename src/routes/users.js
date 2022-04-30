import express from 'express'
import { User } from '../controllers/UserController.js'
import { middleware } from '../controllers/middleware.js'


const user = express.Router();
user.use(middleware);

user.get('/', async (req, res) => {
    const id = req.baseUrl;
    const userLogged = await new User().read(id);
    //essa baseUrl tá sendo setada pelo middleware e recebe o id do user no token
    res.send(userLogged);
})

user.put('/update', async(req, res) => {
    const dataToUpdate = req.body;
    const id = req.baseUrl;

    const handleReturn = await new User().update(id, dataToUpdate);
    res.send(handleReturn);
})

user.delete('/delete', async(req, res) => {
    const id = req.baseUrl;
    const handleReturn = await new User().delete(id);
    res.send(handleReturn);
})


export { user }