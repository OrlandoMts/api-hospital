import { NextFunction, Request, Response } from "express";
import { Result, validationResult } from "express-validator";
import { Document, Model } from "mongoose";

import {
	MSG_NOT_EXIST_ENTITY,
	MSG_NOT_PERMISSION,
	MSG_VALIDATION_MDW_EXIST_EMAIL,
} from "@messages/index";
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

export const existEntity = async (id: string, model: Model<Document> | any) => {
	try {
		const exist = await model.findOne({ _id: id, status: true });
		if (!exist) throw new Error(MSG_NOT_EXIST_ENTITY);
	} catch (error: any) {
		throw new Error(error?.message || MSG_NOT_EXIST_ENTITY);
	}
};

// TODO: recibir los roles desde el token, para poder verificar
export const checkRoles = (
	req: Request,
	res: Response,
	next: NextFunction,
	...rolesAllow: Array<string>
) => {
	try {
		const { roles } = req as any;
		const isAllow = roles.some((r: string) => rolesAllow.includes(r));
		if (!isAllow) {
			return HttpApiResponse<{}>(false, res, 401, MSG_NOT_PERMISSION);
		}
		next();
	} catch (error: any) {
		throw new Error(error?.message || MSG_NOT_PERMISSION);
	}
};

export default { checksFields, existEmail };
