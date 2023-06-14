import { Document, Model } from "mongoose";

import { MSG_ERR_UPDATE } from "@messages/msgs";
import { MSG_ERR_SERV } from "../../messages";
import { BasePopItf, HTTPPaginationItf } from "../interface";

export class BaseRsv<T> {
	private _model: Model<Document> | any;
	private _name: string = "";
	private _popOp: Array<BasePopItf> = [];

	constructor(model: Model<Document> | any, name: string) {
		this._model = model;
		this._name = name;
	}

	public getPopulate(): Array<BasePopItf> {
		return this._popOp;
	}

	public async getAll(): Promise<HTTPPaginationItf<T>> {
		try {
			const data = await this._model.find({ status: true });
			const total = await this._model.countDocuments({ status: true });
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

	public async get(id: string) {
		try {
			return await this._model.findById(id);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	public async update(id: string, entity: T): Promise<T> {
		try {
			return await this._model.findByIdAndUpdate(id, entity, { new: true });
		} catch (error: any) {
			throw new Error(MSG_ERR_UPDATE(error));
		}
	}

	public async inactive(id: string, entity: T): Promise<T> {
		try {
			return await this._model.findByIdAndUpdate(id, entity, { new: true });
		} catch (error: any) {
			throw new Error(MSG_ERR_UPDATE(error));
		}
	}

	public async delete(id: string): Promise<T> {
		try {
			return await this._model.findByIdAndDelete(id, { new: true });
		} catch (error: any) {
			throw new Error(MSG_ERR_UPDATE(error));
		}
	}

	public async findOne(id: string): Promise<T> {
		try {
			return await this._model
				.findOne({ _id: id, status: true })
				.populate(this.getPopulate());
		} catch (error: any) {
			throw new Error(MSG_ERR_UPDATE(error));
		}
	}
}

export default BaseRsv;
