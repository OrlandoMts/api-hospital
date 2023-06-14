import { Types } from "mongoose";

import { HospitalItf } from "@modHospital/interface";
import { HospitalRsv } from "@modHospital/resolver";
import { UserItf } from "@modUsers/interface";

export class HospitalCls implements HospitalItf {
	_id?: string | Types.ObjectId = undefined;
	name: string = "";
	img: string = "";
	author?: UserItf | string | Types.ObjectId = undefined;
	status?: boolean = true;
	created?: Date = new Date();
	updated?: Date = new Date();
}

export async function EntityHospital(
	id: string = "",
	hospital: HospitalItf | undefined = undefined
): Promise<HospitalItf> {
	const map = new HospitalCls();
	try {
		const dt: HospitalItf | undefined =
			id.length === 0 ? hospital : await HospitalRsv.instance.get(id);
		map._id = dt && dt._id ? new Types.ObjectId(dt._id) : undefined;
		map.name = dt && dt.name ? dt.name : "";
		map.img = dt && dt.img ? dt.img : "";
		map.author = dt && dt?.author ? dt?.author : "";
		map.status =
			dt && dt.status && dt.status.toString() == "false" ? false : true;
	} catch (error: any) {}
	return map;
}
