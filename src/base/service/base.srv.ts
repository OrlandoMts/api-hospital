import { MSG_ERR_SERV, MSG_VALIDATION_ID_MONGO } from "@messages/index";
import { MSG_ERR_UPDATE } from "@messages/msgs";
import { HTTPPaginationItf } from "../interface";
import { BaseRsvItf } from "../interface/base.itf";
import { BaseRsv } from "../resolver/base.rsv";

export class BaseSrv<T> {
	private _rsv: BaseRsvItf;

	constructor(rsv: BaseRsvItf) {
		this._rsv = rsv;
	}

	public async getAll(): Promise<HTTPPaginationItf<T>> {
		try {
			return await (this._rsv as BaseRsv<T>).getAll();
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
}

export default BaseSrv;
