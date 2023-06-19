import { NextFunction, Request, Response, Router } from "express";

import {
	MSG_VALIDATION_ID_MONGO,
	MSG_VALIDATION_MDW_NAME,
} from "@messages/msgs";
import { HospitalCtrl } from "@modHospital/controllers";
import { HospitalMap } from "@modHospital/mapping";
import HospitalMod from "@modHospital/models/hospital.mdl";
import { checkRoles, existEntity } from "@srcBase/middleware/checkfield.mdw";
import { checksFields, validateJWT } from "@srcBase/middleware/index";
import { ROLES } from "@srcBase/secure";
import { check } from "express-validator";

export class HospitalRoutes {
	private static _instance: HospitalRoutes;
	private router: Router;
	private _hospitalCtrl: HospitalCtrl = HospitalCtrl.instance;
	private _hospitalMap: HospitalMap = HospitalMap.instance;
	/* private _userCrl: UserCrl = UserCrl.instance;
	private _userMap: UserMap = UserMap.instance; */

	constructor() {
		this.router = Router();
	}

	public static get instance(): HospitalRoutes {
		return this._instance || (this._instance = new this());
	}

	public setRouter(): Router {
		this.router.get(
			"/",
			[
				validateJWT,
				(req: Request, res: Response, next: NextFunction) =>
					checkRoles(req, res, next, ROLES.NEW_USER),
				checksFields,
			],
			(req: Request, res: Response) => this._hospitalCtrl.getAll(req, res)
		);

		this.router.post(
			"/",
			[
				validateJWT,
				(req: Request, res: Response, next: NextFunction) =>
					checkRoles(req, res, next, ROLES.NEW_USER),
				check("name", MSG_VALIDATION_MDW_NAME).notEmpty(),
				// check("author", MSG_VALIDATION_ID_MONGO).isMongoId(),
				// check("author").custom((val) => existEntity(val, UserMod)),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._hospitalCtrl.create(req, res, this._hospitalMap.create(req))
		);

		this.router.put(
			"/:_id",
			[
				validateJWT,
				(req: Request, res: Response, next: NextFunction) =>
					checkRoles(req, res, next, ROLES.ADMIN),
				check("_id", MSG_VALIDATION_ID_MONGO).isMongoId(),
				check("_id").custom((val) => existEntity(val, HospitalMod)),
				check("name", MSG_VALIDATION_MDW_NAME).optional().notEmpty(),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._hospitalCtrl.update(req, res, this._hospitalMap.update(req))
		);

		this.router.delete(
			"/:_id",
			[
				validateJWT,
				(req: Request, res: Response, next: NextFunction) =>
					checkRoles(req, res, next, ROLES.ADMIN),
				check("_id", MSG_VALIDATION_ID_MONGO).isMongoId(),
				check("_id").custom((val) => existEntity(val, HospitalMod)),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._hospitalCtrl.inactive(req, res, this._hospitalMap.inactive(req))
		);

		return this.router;
	}
}

export default HospitalRoutes;
