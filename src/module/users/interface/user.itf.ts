import { Types } from "mongoose";

export interface UserItf {
	_id?: string | Types.ObjectId;
	name: string;
	email: string;
	password: string;
	img: string;
	role: string;
	google: boolean;
	status?: boolean;
	created?: Date;
	updated?: Date;
}
