import express from 'express'
import helmet from 'helmet'

const app = express();
const port = process.env.PORT || 2727;

app.use(helmet());

app.get('/', (req, res) => res.send('documentação com swagger em breve'));

app.listen(port, () => console.log(`running in http://localhost:${port}`));