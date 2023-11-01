import express from 'express';
import router from './routes/index.router';
import dotenv from 'dotenv';

const cors = require('cors')

const app = express();

dotenv.config();

//middlewares para serialización, des-serialización y cors
app.use(express.json());
app.use(cors())

app.use(router);

app.listen(process.env.PORT_DEV?process.env.PORT_DEV:"3000", () => {
  console.log('Server running on port 3000');
});