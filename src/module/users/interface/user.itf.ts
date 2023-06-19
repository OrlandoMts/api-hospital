import { BaseEntityItf } from "@srcBase/interface";
import { ROLES } from "@srcBase/secure";

export interface UserItf extends BaseEntityItf {
	name: string;
	email: string;
	password: string;
	img: string;
	role: Array<ROLES>;
	google: boolean;
}
