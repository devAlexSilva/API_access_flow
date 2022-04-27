import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { routes } from '../routes/index.js'

const app = express();
const port = process.env.PORT || 2727;

app.use(express.json());
app.use(helmet());
app.use(cors())

app.get('/', (req, res) => res.send('documentação com swagger em breve'));
app.listen(port, () => console.log(`running in http://localhost:${port}`));

app.use(routes);
