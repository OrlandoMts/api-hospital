import { UserItf } from "@modUsers/interface";
import { Types } from "mongoose";

export interface HospitalItf {
	_id?: string | Types.ObjectId;
	name: string;
	img?: string;
	author?: UserItf | string | Types.ObjectId;
	status?: boolean;
	created?: Date;
	updated?: Date;
}
