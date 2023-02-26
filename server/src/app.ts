import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import 'express-async-errors';
import router from './router';

dotenv.config();

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

app.use(express.static(path.resolve(__dirname, '../../client')));

app.use('/api', router);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../../client', 'server.js'));
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
