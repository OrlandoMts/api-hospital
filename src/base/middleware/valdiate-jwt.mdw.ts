import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { MSG_TOKEN_INVALID, MSG_TOKEN_REQ } from "@messages/msgs";
import { SECRET_JWT } from "@srcBase/config";
import { HttpApiResponse } from "@srcBase/helper";

type JwtPayload = {
	uid: string;
	iat: number;
	exp: number;
};

export const validateJWT = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1] || undefined;
	if (!token) return HttpApiResponse<{}>(false, res, 401, MSG_TOKEN_REQ);
	try {
		const { uid } = jwt.verify(token, SECRET_JWT as string) as JwtPayload;
		(req as any).uid = uid;
		next();
	} catch (error) {
		return HttpApiResponse<{}>(false, res, 401, MSG_TOKEN_INVALID);
	}
};
