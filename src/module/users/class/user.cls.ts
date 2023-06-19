import { UserItf } from "@modUsers/interface";
import { UserRsv } from "@modUsers/resolver";
import { ROLES } from "@srcBase/secure";
import { Types } from "mongoose";

export class UserCls implements UserItf {
	_id?: string | Types.ObjectId = undefined;
	name: string = "";
	email: string = "";
	password: string = "";
	img: string = "";
	role: Array<ROLES> = [];
	google: boolean = false;
	status?: boolean = true;
	created?: Date = new Date();
	updated?: Date = new Date();
}

export async function Entity(
	id: string = "",
	user: UserItf | undefined = undefined
): Promise<UserItf> {
	const map = new UserCls();

	try {
		const dt: UserItf | undefined =
			id.length === 0 ? user : await UserRsv.instance.get(id);
		map._id = dt && dt._id ? new Types.ObjectId(dt._id) : undefined;
		map.name = dt && dt.name ? dt.name : "";
		map.email = dt && dt.email ? dt.email : "";
		map.password = dt && dt.password ? dt.password : "";
		map.img = dt && dt.img ? dt.img : "";
		map.role = dt && dt.role ? [...dt.role] : [ROLES.NEW_USER];
		map.google =
			dt && dt.google && dt.google.toString() == "false" ? true : false;
		map.status =
			dt && dt.status && dt.status.toString() == "false" ? false : true;
	} catch (error: any) {}
	return map;
}

export default UserCls;
