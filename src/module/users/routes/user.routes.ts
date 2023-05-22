import { Request, Response, Router } from "express";
import { check } from "express-validator";

import { checksFields, existEmail } from "@srcBase/middleware/index";

import {
	MSG_VALIDATION_MDW_EMAIL,
	MSG_VALIDATION_MDW_NAME,
	MSG_VALIDATION_MDW_PASSWORD,
} from "@messages/index";
import UserMod from "@modUsers/models/user.mdl";
import { UserCrl } from "../controllers";

export class UserRouter {
	private static _instance: UserRouter;
	private router: Router;
	private _userCrl: UserCrl = UserCrl.instance;

	constructor() {
		this.router = Router();
	}

	public static get instance(): UserRouter {
		return this._instance || (this._instance = new this());
	}

	public setRouter(): Router {
		this.router.get("/", (req: Request, res: Response) =>
			this._userCrl.getAll(req, res)
		);

		this.router.post(
			"/",
			[
				check("name", MSG_VALIDATION_MDW_NAME).notEmpty(),
				check("email", MSG_VALIDATION_MDW_EMAIL).notEmpty(),
				check("email", MSG_VALIDATION_MDW_EMAIL).isEmail(),
				check("email").custom((val) => existEmail(val, UserMod)),
				check("password", MSG_VALIDATION_MDW_PASSWORD).notEmpty(),
				checksFields,
			],
			(req: Request, res: Response) => this._userCrl.create(req, res)
		);

		return this.router;
	}
}

export default UserRouter;
