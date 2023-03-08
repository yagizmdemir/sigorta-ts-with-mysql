import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { mySqlConnection } from '../../utils/connect';
import { ResponseService } from '../../utils/response';

interface IMusteri {
	addMusteri(res: Response, table: string, values: object): Promise<void>;
	getAllMusteri(req: Request, res: Response, table: string): Promise<void>;
	getMusteri(
		req: Request,
		res: Response,
		table: string,
		where: string,
		search: string
	): Promise<void>;
	deleteMusteri(
		req: Request,
		res: Response,
		table: string,
		values: string,
		where: string
	): Promise<void>;
	updateMusteri(req: Request, res: Response): Promise<void>;
}

export class musteriService implements IMusteri {

	async addMusteri(res: Response, table: string, values: object): Promise<void> {
		const text = `INSERT INTO ${table} SET ?`;
		const operation = mySqlConnection.query(text, values, (err, result) => {
			if (err != null) {
				return new ResponseService(null, 'Something went wrong').error400(res);
			}
			if (result) {
				return new ResponseService(result, 'Success').created(res);
			}
		});
	}

    // Müşteriyi temsilci ve ajans idsine göre de çekebilmemiz gerek
	async getAllMusteri(req: Request, res: Response, table: string): Promise<void> {
		const text = `SELECT * FROM ${table}`;
		const operation = mySqlConnection.query(text, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
			if (result) return new ResponseService(result, 'Success').success(res);
		});
	}
    async getMusteri(req: Request, res: Response, table: string, where: string, search: string): Promise<void>{
        const text = `SELECT * FROM ${table} WHERE ${where} = ?`;
		const operation = mySqlConnection.query(text, search, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
			if (result) return new ResponseService(result, 'Success').success(res);
		});
    }
    async deleteMusteri(req: Request, res: Response, table: string, values: string, where: string): Promise<void> {
        const text = `DELETE FROM ${table} WHERE ${where} = "${values}"`;
		const operation = mySqlConnection.query(text, values, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (result) {
				return new ResponseService(result, 'Success').success(res);
			}
		});
    }
    updateMusteri(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
}

// middlewareda istek atan kullanıcının ajans_id ve id si alınacak ve ona göre çekilecek.
