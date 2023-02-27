import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { mySqlConnection } from '../../utils/connect';
import { ResponseService } from '../../utils/response';

interface IAjans {
	getAllajans(req: Request, res: Response, table: string): Promise<void>;
	getAjans(
		req: Request,
		res: Response,
		table: string,
		where: string,
		search: string
	): Promise<void>;
	updateAjans(
		req: Request,
		res: Response,
		table: string,
		where: string,
		id: string,
		values: string
	): Promise<void>;
	deleteAjans(
		req: Request,
		res: Response,
		table: string,
		id: string,
		values: string
	): Promise<void>;
}

export class AjansService implements IAjans {
	async getAllajans(req: Request, res: Response, table: string): Promise<void> {
		const text = `SELECT * FROM ${table}`;
		const operation = mySqlConnection.query(text, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
			if (result) return new ResponseService(result, 'Success').success(res);
		});
	}
	async getAjans(
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
	async updateAjans(
		req: Request,
		res: Response,
		table: string,
		id: string,
		values: string,
		where: string
	): Promise<void> {
		const text = `UPDATE ${table} SET ${id} = ?, WHERE ${where} = ?,`;
		const operation = mySqlConnection.query(text, values, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (result) {
				return new ResponseService(result, 'Success').created(res);
			}
		});
	}
	async deleteAjans(
		req: Request,
		res: Response,
		table: string,
		id: string,
		values: string
	): Promise<void> {
		const text = `DELETE FROM ${table} WHERE ${id} = "${values}"`;
		const operation = mySqlConnection.query(text, values, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (result) {
				return new ResponseService(result, 'Success').success(res);
			}
		});
	}
}
