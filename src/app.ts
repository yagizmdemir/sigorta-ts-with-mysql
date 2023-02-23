import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import router from './router';
import { mySqlConnection } from './utils/connect';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 1337;

app.use(express.json());

app.use(
    express.json({
        limit: '50mb',
    })
);

app.use(
    express.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
    })
);

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
