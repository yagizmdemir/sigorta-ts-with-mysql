import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { mySqlConnection } from '../../utils/connect';
import { ResponseService } from '../../utils/response';

interface IPolice {
	getAllPoliceler(req: Request, res: Response, table: string): Promise<void>;
	getPolice( req: Request, res: Response, table: string, where: string, search: string ): Promise<void>;
	addPolice(res: Response, table: string, values: object): Promise<void>;
	deletePolice( req: Request, res: Response, table: string, values: string, where: string ): Promise<void>;
	updatePolice(req: Request, res: Response): Promise<void>;
}

export class policeService implements IPolice {
   async getAllPoliceler(req: Request, res: Response, table: string): Promise<void> {
            const text = `SELECT * FROM ${table}`;
            const operation = mySqlConnection.query(text, (err, result) => {
                if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
                if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
                if (result) return new ResponseService(result, 'Success').success(res);
            });
        }
    async getPolice(req: Request, res: Response, table: string, where: string, search: string): Promise<void> {
        const text = `SELECT * FROM ${table} WHERE ${where} = ?`;
		const operation = mySqlConnection.query(text, search, (err, result) => {
			if (err != null) return new ResponseService(null, 'Something went wrong').error400(res);
			if (!result.length) return new ResponseService(null, '404 not found!').error404(res);
			if (result) return new ResponseService(result, 'Success').success(res);
		});
    }
    async addPolice(res: Response<any, Record<string, any>>, table: string, values: object): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async deletePolice(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, table: string, values: string, where: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async updatePolice(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        throw new Error('Method not implemented.');
    }

}



// ekleme
// çıkartma
// düzenleme
// hepsini listeleme
// bir tane listeleme


// burada bütün ilerleme mantığı Cüneyt Ertaş tarafından oluşturulacak.
// Oluşturulmaması dahilinde götüne yağlı kazık sokulacak