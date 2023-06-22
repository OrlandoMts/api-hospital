import { Request, Response } from "express";

import { UploadedFile } from "express-fileupload";

import {
	MSG_NOT_FILES,
	MSG_NOT_VALID_FILE,
	MSG_NOT_VALID_OPTION,
} from "@messages/msgs";
import { DoctorCtrl } from "@modDoctor/controllers";
import { DoctorMap } from "@modDoctor/mapping";
import { HospitalCtrl } from "@modHospital/controllers";
import { HospitalMap } from "@modHospital/mapping";
import { UserCrl } from "@modUsers/controllers";
import { UserMap } from "@modUsers/mapping";
import { HttpApiResponse, UploadFileHlp } from "@srcBase/helper";
import { FileSavedType } from "@srcBase/interface";

export class UploadCtrl {
	private static _instance: UploadCtrl;
	private readonly validExtensions: Array<string> = ["png", "jpg", "jpeg"];
	private _userCtrl: UserCrl = UserCrl.instance;
	private _userMap: UserMap = UserMap.instance;
	private _hospitalCtrl: HospitalCtrl = HospitalCtrl.instance;
	private _hospitalMap: HospitalMap = HospitalMap.instance;
	private _doctorCtrl: DoctorCtrl = DoctorCtrl.instance;
	private _doctorMap: DoctorMap = DoctorMap.instance;

	public static get instance(): UploadCtrl {
		return this._instance || (this._instance = new this());
	}

	public async uploadImgIn(
		req: Request,
		res: Response,
		folder: "users" | "doctors" | "hospitals" = "users"
	) {
		if (!req.files || Object.keys(req.files).length === 0) {
			return HttpApiResponse<{}>(false, res, 400, MSG_NOT_FILES);
		}
		const file = req.files.media;
		const typeFile = (file as UploadedFile).name.split(".");
		const extension = typeFile[typeFile.length - 1];

		if (!this.validExtensions.includes(extension)) {
			return HttpApiResponse<{}>(false, res, 400, MSG_NOT_VALID_FILE);
		}

		try {
			const filesaved: FileSavedType = await UploadFileHlp(
				file as UploadedFile,
				folder
			);
			switch (folder) {
				case "users":
					return await this._userCtrl.update(
						req,
						res,
						this._userMap.updateImg(req, filesaved, folder)
					);
				case "hospitals":
					return await this._hospitalCtrl.update(
						req,
						res,
						this._hospitalMap.updateImg(req, filesaved, folder)
					);
				case "doctors":
					return await this._doctorCtrl.update(
						req,
						res,
						this._doctorMap.updateImg(req, filesaved, folder)
					);
				default:
					return HttpApiResponse<{}>(false, res, 400, MSG_NOT_VALID_OPTION);
			}
		} catch (error: any) {
			return HttpApiResponse<{}>(false, res, 500, error);
		}
	}
}

export default UploadCtrl;
