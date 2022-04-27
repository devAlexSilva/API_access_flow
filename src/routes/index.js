import express from 'express'
import { router } from "./createUser.js"

const routes = express.Router();

routes.use('/', router)

export { routes }