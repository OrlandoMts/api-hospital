import { HospitalItf } from "@modHospital/interface";
import HospitalMod from "@modHospital/models/hospital.mdl";
import { BaseRsv } from "@srcBase/resolver";

export class HospitalRsv extends BaseRsv<HospitalItf> {
	private static _instance: HospitalRsv;

	constructor() {
		super(HospitalMod, "HospitalMod");
	}

	public static get instance(): HospitalRsv {
		return this._instance || (this._instance = new this());
	}
}
