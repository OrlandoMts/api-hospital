import { Types } from "mongoose";

import { HospitalItf } from "@modHospital/interface";
import { UserItf } from "@modUsers/interface";

export interface DoctorItf {
	_id?: string | Types.ObjectId;
	name: string;
	img?: string;
	author?: UserItf | string | Types.ObjectId;
	hospital?: HospitalItf | string | Types.ObjectId;
	status?: boolean;
	created?: Date;
	updated?: Date;
}
