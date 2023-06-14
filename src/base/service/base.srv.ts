import { MSG_ERR_SERV, MSG_VALIDATION_ID_MONGO } from "@messages/index";
import { MSG_ERR_UPDATE, MSG_TXT_ERR, PFS_ID } from "@messages/msgs";
import { HTTPPaginationItf } from "../interface";
import { BaseRsvItf } from "../interface/base.itf";
import { BaseRsv } from "../resolver/base.rsv";

export class BaseSrv<T> {
	private _rsv: BaseRsvItf;

	constructor(rsv: BaseRsvItf) {
		this._rsv = rsv;
	}

	public async getAll(
		pg: number = 1,
		lm: number = 25
	): Promise<HTTPPaginationItf<T>> {
		try {
			return await (this._rsv as BaseRsv<T>).getAll(pg, lm);
		} catch (error: any) {
			throw new Error(MSG_ERR_SERV(error));
		}
	}

	public async create(entity: any): Promise<T> {
		try {
			return await (this._rsv as BaseRsv<T>).create(entity);
		} catch (error: any) {
			throw new Error(MSG_ERR_SERV(error));
		}
	}

	public async update(id: string, entity: T): Promise<T> {
		try {
			if (!id) throw new Error(MSG_VALIDATION_ID_MONGO);
			return await (this._rsv as BaseRsv<T>).update(id, entity);
		} catch (error: any) {
			throw new Error(MSG_ERR_UPDATE(error));
		}
	}

	public async inactive(id: string, entity: T): Promise<T> {
		try {
			if (!id) throw new Error(MSG_VALIDATION_ID_MONGO);
			return await (this._rsv as BaseRsv<T>).update(id, entity);
		} catch (error: any) {
			throw new Error(MSG_ERR_UPDATE(error));
		}
	}

	public async delete(id: string): Promise<T> {
		try {
			if (!id) throw new Error(MSG_VALIDATION_ID_MONGO);
			return await (this._rsv as BaseRsv<T>).delete(id);
		} catch (error: any) {
			throw new Error(MSG_ERR_UPDATE(error));
		}
	}

	public async findOne(id: string, msgReq: string = PFS_ID): Promise<T> {
		try {
			if (!id) throw new Error(MSG_ERR_UPDATE(msgReq));
			return await (this._rsv as BaseRsv<T>).findOne(id);
		} catch (error: any) {
			throw new Error(MSG_TXT_ERR(error));
		}
	}
}

export default BaseSrv;
