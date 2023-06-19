import { UserItf } from "@modUsers/interface";
import { BaseEntityItf } from "@srcBase/interface";
import { Types } from "mongoose";

export interface HospitalItf extends BaseEntityItf {
	name: string;
	img?: string;
	author?: UserItf | string | Types.ObjectId;
}
