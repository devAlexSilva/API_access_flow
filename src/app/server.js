import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'
import { routes } from '../routes/index.js'


const port = process.env.PORT || 2727;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(helmet());
app.use(cors());

app.get('/', (req, res) => res.status(200).send('documentação com swagger em breve'));
app.use(routes);

app.listen(port, () => console.log(`running in http://localhost:${port}`));