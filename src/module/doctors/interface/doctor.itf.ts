import { Types } from "mongoose";

import { HospitalItf } from "@modHospital/interface";
import { UserItf } from "@modUsers/interface";
import { BaseEntityItf } from "@srcBase/interface";

export interface DoctorItf extends BaseEntityItf {
	name: string;
	img?: string;
	author?: UserItf | string | Types.ObjectId;
	hospital?: HospitalItf | string | Types.ObjectId;
}
