import express from 'express'
import { router } from './createUser.js'
import { login } from './login.js'


const routes = express.Router();

routes.use('/', router)
routes.use('/', login);

export { routes }