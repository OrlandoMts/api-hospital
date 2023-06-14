import { Types } from "mongoose";

import { DoctorItf } from "@modDoctor/interface";
import { DoctorRsv } from "@modDoctor/resolver";
import { HospitalItf } from "@modHospital/interface";
import { UserItf } from "@modUsers/interface";

export class DoctorCls implements DoctorItf {
	_id?: string | Types.ObjectId = undefined;
	name: string = "";
	img: string = "";
	author?: UserItf | string | Types.ObjectId = undefined;
	hospital?: HospitalItf | string | Types.ObjectId = undefined;
	status?: boolean = true;
	created?: Date = new Date();
	updated?: Date = new Date();
}

export async function Entity(
	id: string = "",
	doctor: DoctorItf | undefined = undefined
): Promise<DoctorItf> {
	const map = new DoctorCls();
	try {
		const dt: DoctorItf | undefined =
			id.length === 0 ? doctor : await DoctorRsv.instance.get(id);
		map._id = dt && dt._id ? new Types.ObjectId(dt._id) : undefined;
		map.name = dt && dt.name ? dt.name : "";
		map.img = dt && dt.img ? dt.img : "";
		map.author = dt && dt?.author ? dt?.author : "";
		map.hospital = dt && dt?.hospital ? dt?.hospital : "";
		map.status =
			dt && dt.status && dt.status.toString() == "false" ? false : true;
	} catch (error: any) {}
	return map;
}
