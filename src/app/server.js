import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { router } from '../routes/createUser.js'

const app = express();
const port = process.env.PORT || 2727;

app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(router);

app.get('/', (req, res) => res.send('documentação com swagger em breve'));


app.listen(port, () => console.log(`running in http://localhost:${port}`));