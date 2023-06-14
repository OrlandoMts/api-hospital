import { Request, Response, Router } from "express";
import { check } from "express-validator";

import {
	MSG_VALIDATION_ID_MONGO,
	MSG_VALIDATION_MDW_NAME,
} from "@messages/msgs";
import { DoctorCtrl } from "@modDoctor/controllers";
import { DoctorMap } from "@modDoctor/mapping";
import { DoctorMod } from "@modDoctor/models";
import HospitalMod from "@modHospital/models/hospital.mdl";
import { existEntity } from "@srcBase/middleware/checkfield.mdw";
import { checksFields, validateJWT } from "@srcBase/middleware/index";

export class DoctorRoutes {
	private static _instance: DoctorRoutes;
	private router: Router;
	private _doctorCtrl: DoctorCtrl = DoctorCtrl.instance;
	private _doctorMap: DoctorMap = DoctorMap.instance;

	constructor() {
		this.router = Router();
	}

	public static get instance(): DoctorRoutes {
		return this._instance || (this._instance = new this());
	}

	public setRouter(): Router {
		this.router.get("/", validateJWT, (req: Request, res: Response) =>
			this._doctorCtrl.getAll(req, res)
		);

		this.router.post(
			"/",
			[
				validateJWT,
				check("name", MSG_VALIDATION_MDW_NAME).notEmpty(),
				check("hospital", MSG_VALIDATION_ID_MONGO).isMongoId(),
				check("hospital").custom((val) => existEntity(val, HospitalMod)),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._doctorCtrl.create(req, res, this._doctorMap.create(req))
		);

		this.router.put(
			"/:_id",
			[
				validateJWT,
				check("_id", MSG_VALIDATION_ID_MONGO).isMongoId(),
				check("_id").custom((val) => existEntity(val, DoctorMod)),
				check("hospital", MSG_VALIDATION_ID_MONGO).isMongoId(),
				check("hospital").custom((val) => existEntity(val, HospitalMod)),
				check("name", MSG_VALIDATION_MDW_NAME).optional().notEmpty(),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._doctorCtrl.update(req, res, this._doctorMap.update(req))
		);

		this.router.delete(
			"/:_id",
			[
				validateJWT,
				check("_id", MSG_VALIDATION_ID_MONGO).isMongoId(),
				check("_id").custom((val) => existEntity(val, DoctorMod)),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._doctorCtrl.inactive(req, res, this._doctorMap.inactive(req))
		);

		return this.router;
	}
}

export default DoctorRoutes;
