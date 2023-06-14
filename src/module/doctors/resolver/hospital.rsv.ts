import { DoctorItf } from "@modDoctor/interface";
import { DoctorMod } from "@modDoctor/models";
import { BaseRsv } from "@srcBase/resolver";

export class DoctorRsv extends BaseRsv<DoctorItf> {
	private static _instance: DoctorRsv;

	constructor() {
		super(DoctorMod, "DoctorMod");
	}

	public static get instance(): DoctorRsv {
		return this._instance || (this._instance = new this());
	}
}
