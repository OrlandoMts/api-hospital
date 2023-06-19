import { Request, Response } from "express";

import { UploadedFile } from "express-fileupload";

import {
	MSG_NOT_FILES,
	MSG_NOT_VALID_FILE,
	MSG_UPDATE_IMG,
} from "@messages/msgs";
import { HttpApiResponse, UploadFileHlp } from "@srcBase/helper";

export class UploadCtrl {
	private static _instance: UploadCtrl;
	private readonly validExtensions: Array<string> = ["png", "jpg", "jpeg"];

	public static get instance(): UploadCtrl {
		return this._instance || (this._instance = new this());
	}

	public async uploadImgIn(
		req: Request,
		res: Response,
		folder: string = "users"
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
			await UploadFileHlp(file as UploadedFile, folder);
			return HttpApiResponse<{}>(true, res, 200, MSG_UPDATE_IMG);
		} catch (error: any) {
			return HttpApiResponse<{}>(false, res, 500, error);
		}
	}
}

export default UploadCtrl;
