import { Request, Response } from "express";
import { Document, Model } from "mongoose";
import UserMod from "../models/user.mdl";

export class UserCrl {
	private static _instance: UserCrl;
	private _userMod: Model<Document> | any = UserMod;

	constructor() {}

	public static get instance(): UserCrl {
		return this._instance || (this._instance = new this());
	}

	public async getAll(req: Request, res: Response) {
		const users = await this._userMod.find();
		res.json({
			ok: true,
			msg: "Obteniendo los usuarios",
			data: {
				users,
			},
		});
	}

	public async create(req: Request, res: Response) {
		const { name, email, password } = req.body;

		const usuario = await this._userMod.create(req.body);

		res.json({
			ok: true,
			msg: "Usuario creado",
			usuario,
		});
	}
}

export default UserCrl;
