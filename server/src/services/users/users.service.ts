import { Request, Response } from 'express';
import { mySqlConnection } from '../../utils/connect';
import { ResponseService } from '../../utils/response';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';



interface IUser {
	getUsers(req: Request, res: Response, table: string): Promise<void>;
	getUser( req: Request, res: Response, table: string, where: string, seacrh: string ): Promise<void>;
	addUser(res: Response, table: string, values: object): Promise<void>;
	deleteUser( req: Request, res: Response, table: string, values: string, where: string ): Promise<void>;
	updateUser(req: Request, res: Response, table: string, columns: string[any], values: Array<any>, where: string): Promise<void>;
}

export class UserService implements IUser {
	async getUsers(req: Request, res: Response, table: string): Promise<void> {
		const text = `SELECT * FROM ${table}`;
		const operation = mySqlConnection.query(text, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
			if (result) return new ResponseService(result, 'Success').success(res);
		});
	}

	async getUser( req: Request, res: Response, table: string, where: string, seacrh: string ): Promise<void> {
		const text = `SELECT * FROM ${table} WHERE ${where} = ?`;
		const operation = mySqlConnection.query(text, seacrh, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
			if (result) return new ResponseService(result, 'Success').success(res);
		});
	}

	async addUser(res: Response, table: string, values: object): Promise<void> {
		try {
			const password = crypto.randomBytes(4).toString('hex');
			const saltRounds = 10;
			const hashedPassword = await bcrypt.hash(password, saltRounds);
		}catch {
		const text = `INSERT INTO ${table} SET ?`;
		const operation = mySqlConnection.query(text, {values, password: hashedPassword }, (err, result) => {
			const sk = process.env.JWT_SECRET as string;
			if (err) {
				if (err.code === 'ER_DUP_ENTRY') {
					return new ResponseService(
						null,
						'Girdiğiniz bilgiler sistemimizde kayıtlı.'
					).error400(res);
				}
				if (err.code === 'ER_DATA_TOO_LONG') {
					return new ResponseService(
						null,
						'Girdiğiniz bilgileri tekrar kontrol ediniz.'
					).error400(res);
				}
				return new ResponseService(null, 'Server internal error!').error500(res);
			}
			if (result.insertId) {
				const id = result.insertId;
				const confirmationPayload = { sub: id };
				jwt.sign(confirmationPayload, sk, (error: any, encoded: any) => {
					if (encoded) {
						const utext = `UPDATE ${table} SET confirmation_token = ? WHERE id = ?`;
						mySqlConnection.query(utext, [encoded, id]);
					} else {
						console.log(error);
					}
				});
				return new ResponseService(null, 'Success').created(res);
				/*const transporter = nodemailer.createTransport({
					host: 'smtp.gmail.com',
					port: 587,
					secure: false,
					auth: {
					  user: 'your-email@gmail.com',
					  pass: 'your-password'
					}
				  });
				  const mailOptions = {
					from: 'your-email@gmail.com',
					to: 'recipient-email@gmail.com',
					subject: 'New Password',
					text: `Your new password is: ${password}`
				  };
			
				  transporter.sendMail(mailOptions, (error
			} */
		});
	}
	}

	async deleteUser( req: Request, res: Response, table: string, where: string, values: string ): Promise<void> {
		const text = `DELETE FROM ${table} WHERE ${where} = "${values}"`;
		const operation = mySqlConnection.query(text, values, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (result) {
				return new ResponseService(result, 'Success').created(res);
			}
		});
	}

	async updateUser(req: Request, res: Response, table: string, columns: string[any], values: Array<any>, where: string): Promise<void> {
		let cols = '';
		let clause = '';
		for (let i = 0; i < columns.length; i++) {
			if (i !== columns.length - 1) {
				clause = columns[i] + ' = ?, ';
			} else {
				clause = columns[i] + ' = ? ';
			}
			cols += clause;
		}
		const sql = `UPDATE ${table} SET ${cols} WHERE ${where}`;
		const rows = await mySqlConnection.query(
			sql,
			values,
			(error: any, results: any, fields: any) => {
				if (error) return new ResponseService(null, 'Something went wrong').error400(res)
				if (results.affectedRows === 0) return new ResponseService(null, '404 not founnd').error404(res)
				if (results.affectedRows > 0) return new ResponseService(columns, 'Something went wrong').error400(res)
			}
		);
	}
}
function hashedPassword(err: any, result: any): any {
	throw new Error('Function not implemented.');
}

