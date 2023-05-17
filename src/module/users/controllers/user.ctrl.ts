import { Request, Response } from "express";

export class UserCrl {
	private static _instance: UserCrl;

	constructor() {}

	public static get instance(): UserCrl {
		return this._instance || (this._instance = new this());
	}

	public getAll(req: Request, res: Response) {
		res.json({
			ok: true,
			msg: "hola mundo",
			data: {
				usuarios: [{ nombre: "orlando montes" }, { nombre: "daniel montes" }],
			},
		});
	}
}

export default UserCrl;
