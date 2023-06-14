import { Request } from "express";
import mongoose from "mongoose";

import { Entity } from "@modHospital/class/index";
import { HospitalItf } from "@modHospital/interface";
import { BaseMap } from "@srcBase/mapping";

export class HospitalMap extends BaseMap<HospitalItf> {
	private static _instance: HospitalMap;

	constructor() {
		super(Entity);
	}

	public static get instance(): HospitalMap {
		return this._instance || (this._instance = new this());
	}

	public async create(req: Request) {
		const { uid } = req as any;
		const { ...body } = req.body;
		const hospmap: HospitalItf = await Entity();
		hospmap && body.name && (hospmap.name = body.name);
		hospmap && uid && (hospmap.author = new mongoose.Types.ObjectId(uid));
		hospmap.status = true;

		return hospmap;
	}

	public async update(req: Request) {
		const { _id } = req.params;
		const { name } = req.body;
		const hospmap: HospitalItf = await Entity(_id);
		hospmap && name ? (hospmap.name = name) : (hospmap.name = "");
		return hospmap;
	}
}
