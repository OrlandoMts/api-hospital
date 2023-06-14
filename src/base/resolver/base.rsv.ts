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

	public setPopulate(populate: Array<BasePopItf> = []): void {
		this._popOp = populate;
	}

	public getPopulate(): Array<BasePopItf> {
		return this._popOp;
	}

	public async getAll(
		page: number = 1,
		limit: number = 25
	): Promise<HTTPPaginationItf<T>> {
		try {
			const querypage: number =
				Math.ceil(parseInt(page.toString())) <= 1
					? 1
					: Math.ceil(parseInt(page.toString())) || 1;
			const PN: number =
				Math.ceil(parseInt(page.toString())) <= 1
					? 0
					: Math.ceil(parseInt(page.toString()) - 1) || 0;
			const querylimit: number =
				Math.ceil(parseInt(limit.toString())) < 1
					? 25
					: Math.ceil(parseInt(limit.toString())) || 25;

			const [data, total] = await Promise.all([
				this._model
					.find({ status: true })
					.populate(this.getPopulate())
					.skip(querypage * PN)
					.limit(querylimit),

				this._model.count({ status: true }),
			]);
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
