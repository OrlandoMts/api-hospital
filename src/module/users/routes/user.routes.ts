import { Request, Response, Router } from "express";
import { check } from "express-validator";

import {
	checksFields,
	existEmail,
	validateJWT,
} from "@srcBase/middleware/index";

import {
	MSG_VALIDATION_ID_MONGO,
	MSG_VALIDATION_MDW_EMAIL,
	MSG_VALIDATION_MDW_NAME,
	MSG_VALIDATION_MDW_PASSWORD,
	MSG_VALIDATION_MDW_ROLE,
} from "@messages/index";
import { UserMap } from "@modUsers/mapping";
import UserMod from "@modUsers/models/user.mdl";
import { existEntity } from "@srcBase/middleware/checkfield.mdw";
import { UserCrl } from "../controllers";

export class UserRouter {
	private static _instance: UserRouter;
	private router: Router;
	private _userCrl: UserCrl = UserCrl.instance;
	private _userMap: UserMap = UserMap.instance;

	constructor() {
		this.router = Router();
	}

	public static get instance(): UserRouter {
		return this._instance || (this._instance = new this());
	}

	public setRouter(): Router {
		this.router.get("/", validateJWT, (req: Request, res: Response) =>
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
			(req: Request, res: Response) =>
				this._userCrl.create(req, res, this._userMap.create(req))
		);

		this.router.put(
			"/:_id",
			[
				validateJWT,
				check("_id", MSG_VALIDATION_ID_MONGO).isMongoId(),
				check("_id").custom((val) => existEntity(val, UserMod)),
				check("name", MSG_VALIDATION_MDW_NAME).optional().notEmpty(),
				check("role", MSG_VALIDATION_MDW_ROLE).optional().notEmpty(),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._userCrl.update(req, res, this._userMap.update(req))
		);

		this.router.delete(
			"/:_id",
			[
				validateJWT,
				check("_id", MSG_VALIDATION_ID_MONGO).isMongoId(),
				check("_id").custom((val) => existEntity(val, UserMod)),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._userCrl.inactive(req, res, this._userMap.inactive(req))
		);

		this.router.delete(
			"/delete/:_id",
			[
				validateJWT,
				check("_id", MSG_VALIDATION_ID_MONGO).isMongoId(),
				check("_id").custom((val) => existEntity(val, UserMod)),
				checksFields,
			],
			(req: Request, res: Response) => this._userCrl.delete(req, res)
		);

		return this.router;
	}
}

export default UserRouter;
