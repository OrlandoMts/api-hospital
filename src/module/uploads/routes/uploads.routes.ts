import { Request, Response, Router } from "express";

import fileUpload from "express-fileupload";
import { check } from "express-validator";

import { DoctorMod } from "@modDoctor/models";
import HospitalMod from "@modHospital/models/hospital.mdl";
import { UploadCtrl } from "@modUploads/controllers";
import UserMod from "@modUsers/models/user.mdl";
import { validateJWT } from "@srcBase/middleware";
import { checksFields, existEntity } from "@srcBase/middleware/checkfield.mdw";

export class UploadsRouter {
	private static _instance: UploadsRouter;
	private router: Router;
	private _uploadCtrl: UploadCtrl = UploadCtrl.instance;

	constructor() {
		this.router = Router();
		this.router.use(fileUpload());
	}

	public static get instance(): UploadsRouter {
		return this._instance || (this._instance = new this());
	}

	public setRouter(): Router {
		this.router.put(
			"/users/:_id",
			[
				validateJWT,
				check("_id").custom((val) => existEntity(val, UserMod)),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._uploadCtrl.uploadImgIn(req, res, "users")
		);
		this.router.put(
			"/hospital/:_id",
			[
				validateJWT,
				check("_id").custom((val) => existEntity(val, HospitalMod)),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._uploadCtrl.uploadImgIn(req, res, "hospitals")
		);
		this.router.put(
			"/doctor/:_id",
			[
				validateJWT,
				check("_id").custom((val) => existEntity(val, DoctorMod)),
				checksFields,
			],
			(req: Request, res: Response) =>
				this._uploadCtrl.uploadImgIn(req, res, "doctors")
		);

		return this.router;
	}
}

export default UploadsRouter;
