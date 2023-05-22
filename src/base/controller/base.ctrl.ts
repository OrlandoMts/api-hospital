import { Request, Response } from "express";

import { MSG_ERR_SERV, MSG_USER_ALL, MSG_USER_CREATED } from "../../messages";
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

	public async create(req: Request, res: Response) {
		try {
			// TODO: mapear la solicitud
			const data = await (this._srv as BaseSrv<T>).create(req.body);
			return HttpApiResponse<T>(true, res, 200, MSG_USER_CREATED, data);
		} catch (error: any) {
			return HttpApiResponse<{}>(false, res, 400, MSG_ERR_SERV(error));
		}
	}
}

export default BaseCtrl;
