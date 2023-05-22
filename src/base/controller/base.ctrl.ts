import { Request, Response } from "express";

import {
	MSG_ERR_SERV,
	MSG_USER_ALL,
	MSG_USER_CREATED,
	MSG_USER_UPDATED,
} from "@messages/index";
import { MSG_ERR_UPDATE, MSG_USER_DELETED } from "@messages/msgs";
import { HttpApiResponse } from "../helper";
import { HTTPPaginationItf } from "../interface";
import { BaseRsvItf } from "../interface/base.itf";
import { BaseSrv } from "../service/base.srv";

export class BaseCtrl<T> {
	private _srv: BaseRsvItf;

	public constructor(srv: BaseRsvItf) {
		this._srv = srv;
	}

	public async getAll(req: Request, res: Response): Promise<Response> {
		try {
			const data = await (this._srv as BaseSrv<T>).getAll();
			return HttpApiResponse<HTTPPaginationItf<T>>(
				true,
				res,
				200,
				MSG_USER_ALL,
				data
			);
		} catch (error: any) {
			return HttpApiResponse<{}>(false, res, 200, MSG_ERR_SERV(error));
		}
	}

	public async create(req: Request, res: Response, map: any) {
		try {
			const body = await map;
			const data = await (this._srv as BaseSrv<T>).create(body);
			return HttpApiResponse<T>(true, res, 200, MSG_USER_CREATED, data);
		} catch (error: any) {
			return HttpApiResponse<{}>(false, res, 400, MSG_ERR_SERV(error));
		}
	}

	public async update(req: Request, res: Response, map: any) {
		try {
			const body = await map;
			const { _id } = body;
			const data = await (this._srv as BaseSrv<T>).update(_id, body);
			return HttpApiResponse<T>(true, res, 200, MSG_USER_UPDATED, data);
		} catch (error: any) {
			return HttpApiResponse<{}>(false, res, 200, MSG_ERR_UPDATE(error));
		}
	}

	public async delete(req: Request, res: Response) {
		try {
			const { _id } = req.params;
			const data = await (this._srv as BaseSrv<T>).delete(_id);
			return HttpApiResponse<T>(true, res, 200, MSG_USER_DELETED, data);
		} catch (error: any) {
			return HttpApiResponse<{}>(false, res, 500, MSG_ERR_UPDATE(error));
		}
	}

	public async inactive(req: Request, res: Response, map: any) {
		try {
			const body = await map;
			const { _id } = body;
			const data = await (this._srv as BaseSrv<T>).inactive(_id, body);
			return HttpApiResponse<T>(true, res, 200, MSG_USER_UPDATED, data);
		} catch (error: any) {
			return HttpApiResponse<{}>(false, res, 200, MSG_ERR_UPDATE(error));
		}
	}
}

export default BaseCtrl;
