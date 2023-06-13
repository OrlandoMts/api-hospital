import { Request, Response, Router } from "express";
import { check } from "express-validator";

import {
	MSG_VALIDATION_MDW_EMAIL,
	MSG_VALIDATION_MDW_PASSWORD,
} from "@messages/msgs";
import { checksFields } from "@srcBase/middleware";
import LoginCtrl from "../controllers/login.ctrl";

export class LoginRoutes {
	private static _instance: LoginRoutes;
	private router: Router;
	private _loginCtrl: LoginCtrl = LoginCtrl.instance;

	constructor() {
		this.router = Router();
	}

	public static get instance(): LoginRoutes {
		return this._instance || (this._instance = new this());
	}

	public setRouter(): Router {
		this.router.post(
			"/auth",
			[
				check("email", MSG_VALIDATION_MDW_EMAIL).isEmail(),
				check("password", MSG_VALIDATION_MDW_PASSWORD).notEmpty(),
				checksFields,
			],
			(req: Request, res: Response) => this._loginCtrl.login(req, res)
		);

		return this.router;
	}
}

export default LoginRoutes;
