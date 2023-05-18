import { Document, Model } from "mongoose";

import { MSG_ERR_SERV } from "../../messages";
import { HTTPPaginationItf } from "../interface";

export class BaseRsv<T> {
	private _model: Model<Document> | any;
	private _name: string = "";

	constructor(model: Model<Document> | any, name: string) {
		this._model = model;
		this._name = name;
	}

	public async getAll(): Promise<HTTPPaginationItf<T>> {
		try {
			const data = await this._model.find();
			const total = await this._model.countDocuments();
			return { data, total };
		} catch (error: any) {
			throw new Error(MSG_ERR_SERV(error));
		}
	}

	public async create(entity: T): Promise<T> {
		try {
			const data = await this._model.create(entity);
			return data;
		} catch (error: any) {
			throw new Error(MSG_ERR_SERV(error));
		}
	}
}

export default BaseRsv;
