import { FileSavedType } from "@srcBase/interface";
import { Request } from "express";

import fs from "fs";
import path from "path";

export class BaseMap<T> {
	private _entity;

	constructor(entity: any) {
		this._entity = entity;
	}

	public async inactive(req: Request): Promise<T> {
		const { _id } = req.params;
		const map = await this._entity(_id);
		map.status = false;
		return map;
	}

	public async updateImg(
		req: Request,
		file: FileSavedType,
		folder: string = "users"
	): Promise<T> {
		const { _id } = req.params;
		const { uuidname: namefile } = file;

		const map = await this._entity(_id);
		if (map.img.length === 0) {
			namefile ? (map.img = namefile) : (map.img = "");
		} else {
			const imgEntity = path.join(
				__dirname,
				"../../uploads",
				`/${folder}`,
				map.img
			);
			if (fs.existsSync(imgEntity)) {
				fs.unlinkSync(imgEntity);
			}
			namefile ? (map.img = namefile) : (map.img = "");
		}

		return map;
	}
}
