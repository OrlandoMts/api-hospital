import { UserItf } from "@modUsers/interface";
import { UserRsv } from "@modUsers/resolver";
import { Types } from "mongoose";

export class UserCls implements UserItf {
	_id?: string | Types.ObjectId = undefined;
	name: string = "";
	email: string = "";
	password: string = "";
	img: string = "";
	role: string = "";
	google: boolean = false;
	status?: boolean = true;
	created?: Date = new Date();
	updated?: Date = new Date();
}

export async function EntityUser(
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
		map.role = dt && dt.role ? dt.role : "ROLE_USER_NEW";
		map.google =
			dt && dt.google && dt.google.toString() == "false" ? true : false;
		map.status =
			dt && dt.status && dt.status.toString() == "false" ? false : true;
	} catch (error: any) {}
	return map;
}

export default UserCls;
