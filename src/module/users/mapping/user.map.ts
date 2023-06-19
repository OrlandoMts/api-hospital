import { genSaltSync, hashSync } from "bcrypt";
import { Request } from "express";

import { Entity } from "@modUsers/class/index";
import { UserItf } from "@modUsers/interface";
import { BaseMap } from "@srcBase/mapping";
import { ROLES } from "@srcBase/secure";

export class UserMap extends BaseMap<UserItf> {
	private static _instance: UserMap;

	constructor() {
		super(Entity);
	}

	public static get instance(): UserMap {
		return this._instance || (this._instance = new this());
	}

	public async create(req: Request): Promise<UserItf> {
		const { _id, status, ...body } = req.body;
		const map: UserItf = await Entity();

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
		const role = body.role.toUpperCase();
		const rolesAllow = Object.values(ROLES);
		const map: UserItf = await Entity(_id);
		// 1. Verifica si el role del body existe en el enum, sino lo inserta con ROLE.NEW_USER
		// 2. Valido que no se duplique el rol
		if (rolesAllow.includes(role)) {
			if (map.role.includes(role)) {
				body.name && (map.name = body.name);
				return map;
			}
			body.name && (map.name = body.name);
			body.role && map.role.push(role);
			return map;
		} else {
			body.name && (map.name = body.name);
			body.role && map.role.push(ROLES.NEW_USER);
			return map;
		}
	}
}

export default UserMap;
