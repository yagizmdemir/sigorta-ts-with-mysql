export interface IResponseValue {
	readonly data: unknown;
	readonly message: unknown;
	readonly limit: unknown;
	readonly page: unknown;
}

export class ResponseService implements IResponseValue {
	public readonly data: unknown;
	public readonly message: string;
	public readonly limit: unknown;
	public readonly page: unknown;

	constructor(data:unknown, message:string, limit?:number, page?: number) {
		this.data = data;
		this.message = message;
		this.limit = limit;
		this.page = page;
	}

	success(res: any) {
		return res.status(200).json({
			status: 200,
			success: true,
			message: this.message ?? 'Success',
			data: this.data,
		});
	}
	list(res: any) {
		return res.status(200).json({
			status: 200,
			success: true,
			message: this.message ?? 'Success',
			pageLimit: this.limit,
			page: this.page,
			data: this.data,
		});
	}
	created(res: any) {
		return res.status(201).json({
			status: 201,
			success: true,
			message: this.message ?? 'Success',
			data: this.data,
		});
	}
	error500(res: any) {
		return res.status(500).json({
			status: 500,
			success: false,
			message: 'Server internal error',
		});
	}
	error400(res: any) {
		return res.status(400).json({
			status: 400,
			success: false,
			message: this.message ?? 'Something went wrong',
		});
	}
	error401(res: any) {
		return res.status(401).json({
			status: 401,
			success: false,
			message: this.message ?? '401 Unauthorized',
		});
	}
	error404(res: any) {
		return res.status(404).json({
			status: 404,
			success: false,
			message: this.message ?? '404 not found',
		});
	}
	error429(res: any) {
		return res.status(429).json({
			status: 429,
			success: false,
			message: 'Request limit exceeded',
		});
	}
}
