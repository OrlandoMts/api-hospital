import bcrypt from "bcrypt";

import { MSG_ERR_GET, MSG_ERR_SERV, MSG_GET_USER } from "@messages/msgs";
import { UserRsv } from "@modUsers/resolver";
import { HttpApiResponse, genJwt } from "@srcBase/helper";
import { BaseSrv } from "@srcBase/service";
import { Request, Response } from "express";
import { LoginItf } from "../interface";
import { LoginRsv } from "../resolver";

export class LoginSrv extends BaseSrv<LoginItf> {
	private static _instance: LoginSrv;
	private _userRsv: UserRsv = UserRsv.instance;

	constructor() {
		super(LoginRsv.instance);
	}

	public static get instance(): LoginSrv {
		return this._instance || (this._instance = new this());
	}

	public async findUser(req: Request, res: Response) {
		try {
			const { password, email } = req.body;

			const user = await this._userRsv.findUserByEmail(email);
			if (user === null) {
				return HttpApiResponse<{}>(
					false,
					res,
					400,
					MSG_ERR_GET("La contraseña y/o correo son incorrectos")
				);
			}
			const validatePassword = bcrypt.compareSync(password, user.password);
			if (!validatePassword) {
				return HttpApiResponse<{}>(
					false,
					res,
					400,
					MSG_ERR_GET("La contraseña y/o correo son incorrectos")
				);
			} else {
				const token = await genJwt(user._id as string);
				return HttpApiResponse<string>(true, res, 200, MSG_GET_USER, token);
			}
		} catch (error: any) {
			throw new Error(MSG_ERR_SERV(error));
		}
	}
}

export default LoginSrv;
