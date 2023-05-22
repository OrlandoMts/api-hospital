import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { Document, Model } from "mongoose";

import { MSG_VALIDATION_MDW_EXIST_EMAIL } from "@messages/index";
import { HttpApiResponse } from "../helper";

export const checksFields = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors: Result = validationResult(req).formatWith(
		({ msg }): string => msg
	);
	if (!errors.isEmpty()) {
		return HttpApiResponse<{}>(false, res, 400, errors.array()[0]);
	}
	next();
};

export const existEmail = async (
	email: string,
	model: Model<Document> | any
) => {
	try {
		const exist = await model.findOne({ email });
		if (exist) throw new Error(MSG_VALIDATION_MDW_EXIST_EMAIL);
	} catch (error: any) {
		throw new Error(error?.message || MSG_VALIDATION_MDW_EXIST_EMAIL);
	}
};

export default { checksFields, existEmail };
