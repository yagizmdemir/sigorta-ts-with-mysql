import { Request, Response } from 'express';
import { mySqlConnection } from '../../utils/connect';
import { ResponseService } from '../../utils/response';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface IRepresent {
	register(req: Request, res: Response, table: string, values: object, ajans: any): Promise<void>;
	getAll(req: Request, res: Response, table: string): Promise<void>;
	getOne(
		req: Request,
		res: Response,
		table: string,
		where: string,
		search: string
	): Promise<void>;
	update(
		req: Response,
		res: Response,
		columns: Array<string>,
		values: Array<void>
	): Promise<void>;
	addUser(req: Request, res: Response, table: string, values: object): Promise<void>;
	delete(req: Request, res: Response, table: string, id: number): Promise<void>;
}

export class RepresentService implements IRepresent {
	//Başarısız olması durumunda silme yapılacak ya da ön bellekte saklanıp ona göre hepsi tekte insert atılacak.
	async register(
		req: Request,
		res: Response,
		table: string,
		values: object,
		ajans: any
	): Promise<void> {
		const text = `INSERT INTO ${table} SET ?`;
		mySqlConnection.query(text, values, (err, result) => {
			const sk = process.env.JWT_SECRET as string;
			if (err) {
				if (err.code === 'ER_DUP_ENTRY') {
					return new ResponseService(
						null,
						'Giridiğiniz bilgiler sistemimizde kayıtlı. Lütfen giriş yapınız'
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
				jwt.sign(confirmationPayload, sk, (error, encoded) => {
					if (encoded) {
						const utext = `UPDATE ${table} SET confirmation_token = ? WHERE id = ?`;
						mySqlConnection.query(utext, [encoded, id]);
					} else {
						console.log(error);
					}
				});
				ajans['id'] = id;
				mySqlConnection.query(`INSERT INTO ajanslar SET ?`, ajans, (e, r) => {
					if (e) {
						return new ResponseService(null, 'Server internal error!').error500(res);
					} else {
						const atext = `UPDATE ${table} SET ajans = ? WHERE id = ?`;
						mySqlConnection.query(atext, [r.insertId, id]);
					}
				});
				return new ResponseService(null, 'Success').created(res);
			}
		});
	}

	async getAll(req: Request, res: Response, table: string): Promise<void> {
		const text = `SELECT * FROM ${table}`;
		const operation = mySqlConnection.query(text, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
			if (result) return new ResponseService(result, 'Success').success(res);
		});
	}

	async getOne(
		req: Request,
		res: Response,
		table: string,
		where: string,
		search: string
	): Promise<void> {
		const text = `SELECT * FROM ${table} WHERE ${where} = ?`;
		const operation = mySqlConnection.query(text, search, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
			if (result) return new ResponseService(result, 'Success').success(res);
		});
	}

	update(req: Response, res: Response, columns: string[], values: void[]): Promise<void> {
		throw new Error('Method not implemented.');
	}

	addUser(req: Request, res: Response, table: string, values: object): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async delete(req: Request, res: Response, table: string, id: number): Promise<void> {
		const text = `DELETE FROM ${table} WHERE id = "${id}"`;
		const operation = mySqlConnection.query(text, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (result) {
				return new ResponseService(result, 'Success').created(res);
			}
		});
	}
}
