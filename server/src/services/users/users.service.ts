import { Request, Response } from 'express';
import { mySqlConnection } from '../../utils/connect';
import { ResponseService } from '../../utils/response';

interface IUser {
	getUsers(req: Request, res: Response, table: string): Promise<void>;
	getUser(
		req: Request,
		res: Response,
		table: string,
		where: string,
		seacrh: string
	): Promise<void>;
	addUser(res: Response, table: string, values: object): Promise<void>;
	deleteUser(
		req: Request,
		res: Response,
		table: string,
		values: string,
		where: string
	): Promise<void>;
	updateUser(req: Request, res: Response): Promise<void>;
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

	async getUser(
		req: Request,
		res: Response,
		table: string,
		where: string,
		seacrh: string
	): Promise<void> {
		const text = `SELECT * FROM ${table} WHERE ${where} = ?`;
		const operation = mySqlConnection.query(text, seacrh, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
			if (result) return new ResponseService(result, 'Success').success(res);
		});
	}

	async addUser(res: Response, table: string, values: object): Promise<void> {
		const text = `INSERT INTO ${table} SET ?`;
		const operation = mySqlConnection.query(text, values, (err, result) => {
			if (err != null) {
				console.log(err);
				return new ResponseService(null, 'Something went wrong').error400(res);
			}
			if (result) {
				return new ResponseService(result, 'Success').created(res);
			}
		});
	}

	async deleteUser(
		req: Request,
		res: Response,
		table: string,
		where: string,
		values: string
	): Promise<void> {
		const text = `DELETE FROM ${table} WHERE ${where} = "${values}"`;
		const operation = mySqlConnection.query(text, values, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (result) {
				return new ResponseService(result, 'Success').created(res);
			}
		});
	}

	async updateUser(req: Request, res: Response): Promise<void> {}
}
