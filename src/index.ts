import express from 'express';

const cors = require('cors')

const app = express();

//middlewares para serialización, des-serialización y cors
app.use(express.json());
app.use(cors())

app.listen(process.env.PORT_DEV, () => {
  console.log('Server running on port 3000');
});