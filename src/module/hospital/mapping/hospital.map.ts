import { Request } from "express";

import { EntityHospital } from "@modHospital/class/index";
import { HospitalItf } from "@modHospital/interface";
import mongoose from "mongoose";

export class HospitalMap {
	private static _instance: HospitalMap;

	constructor() {}

	public static get instance(): HospitalMap {
		return this._instance || (this._instance = new this());
	}

	public async create(req: Request) {
		const { uid, body } = req as any;
		const hospmap: HospitalItf = await EntityHospital();
		hospmap && body.name && (hospmap.name = body.name);
		hospmap && uid && (hospmap.author = new mongoose.Types.ObjectId(uid));
		hospmap.status = true;

		return hospmap;
	}
}
