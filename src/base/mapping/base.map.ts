import { Request } from "express";

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
}
