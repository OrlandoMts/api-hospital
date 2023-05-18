import { MSG_ERR_SERV } from "../../messages/msgs";
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
}

export default BaseSrv;
