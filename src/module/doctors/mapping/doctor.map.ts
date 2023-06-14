import { Request } from "express";
import mongoose from "mongoose";

import { Entity } from "@modDoctor/class/index";
import { DoctorItf } from "@modDoctor/interface";
import { BaseMap } from "@srcBase/mapping";

export class DoctorMap extends BaseMap<DoctorItf> {
	private static _instance: DoctorMap;

	constructor() {
		super(Entity);
	}

	public static get instance(): DoctorMap {
		return this._instance || (this._instance = new this());
	}

	public async create(req: Request) {
		const { uid } = req as any;
		const { ...body } = req.body;
		const doctmap: DoctorItf = await Entity();
		doctmap && body.name && (doctmap.name = body.name);
		doctmap && uid && (doctmap.author = new mongoose.Types.ObjectId(uid));
		doctmap &&
			body.hospital &&
			(doctmap.hospital = new mongoose.Types.ObjectId(body.hospital));
		doctmap.status = true;

		return doctmap;
	}

	public async update(req: Request) {
		const { _id } = req.params;
		const { ...body } = req.body;
		const doctmap: DoctorItf = await Entity(_id);
		doctmap && body.name ? (doctmap.name = body.name) : (doctmap.name = "");
		doctmap && body.hospital
			? (doctmap.hospital = body.hospital)
			: (doctmap.hospital = "");
		return doctmap;
	}
}
