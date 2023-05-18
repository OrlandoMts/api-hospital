import { Response } from "express";

import { EDHTTPResItf, HTTPResItf } from "../interface";

export function HttpApiResponse<T>(
	ok: boolean,
	response: Response,
	status: number,
	message: string,
	data: Array<EDHTTPResItf<T>> | T = [] || {}
): Response {
	return response
		.status(status)
		.json(HttpObjectResponse<T>(ok, status, message, data));
}

export function HttpObjectResponse<T>(
	ok: boolean,
	status: number,
	message: string,
	data: Array<EDHTTPResItf<T>> | T = [] || {}
): HTTPResItf<T> {
	return {
		ok,
		status,
		message,
		data,
	};
}
