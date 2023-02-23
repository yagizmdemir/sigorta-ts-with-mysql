import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const mySqlConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'sigorta',
});

export { mySqlConnection };
