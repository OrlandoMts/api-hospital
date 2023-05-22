import { genSaltSync, hashSync } from "bcrypt";
import { Request } from "express";

import { EntityUser } from "@modUsers/class/index";
import { UserItf } from "@modUsers/interface";

export class UserMap {
	private static _instance: UserMap;

	constructor() {}

	public static get instance(): UserMap {
		return this._instance || (this._instance = new this());
	}

	public async create(req: Request): Promise<UserItf> {
		const { _id, status, ...body } = req.body;
		const map: UserItf = await EntityUser();

		const salt = genSaltSync(10);

		const hashedPassword = hashSync(body.password, salt);
		body.name && (map.name = body.name);
		body.email && (map.email = body.email);
		body.password && (map.password = hashedPassword);
		body.img && (map.img = body.img);
		body.role && (map.role = body.role);
		body.google && (map.google = body.google);
		map.status = true;

		return map;
	}

	public async update(req: Request): Promise<UserItf> {
		const { _id } = req.params;
		const { status, google, email, ...body } = req.body;
		const map: UserItf = await EntityUser(_id);
		body.name && (map.name = body.name);
		body.role && (map.role = body.role.toUpperCase());
		return map;
	}

	public async inactive(req: Request): Promise<UserItf> {
		const { _id } = req.params;
		const map: UserItf = await EntityUser(_id);
		map.status = false;
		return map;
	}
}

export default UserMap;
