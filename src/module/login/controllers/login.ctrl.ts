import { Request, Response } from "express";

import { MSG_ERR_SERV } from "@messages/msgs";
import { BaseCtrl } from "@srcBase/controller";
import { HttpApiResponse } from "@srcBase/helper";
import { LoginItf } from "../interface";
import { LoginSrv } from "../services";

export class LoginCtrl extends BaseCtrl<LoginItf> {
	private static _instance: LoginCtrl;
	private _loginSrv: LoginSrv = LoginSrv.instance;

	constructor() {
		super(LoginSrv.instance);
	}

	public static get instance(): LoginCtrl {
		return this._instance || (this._instance = new this());
	}

	public async login(req: Request, res: Response): Promise<Response> {
		try {
			return await this._loginSrv.findUser(req, res);
		} catch (error: any) {
			return HttpApiResponse<{}>(false, res, 500, MSG_ERR_SERV(error));
		}
	}
}

export default LoginCtrl;
