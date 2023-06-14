import { HospitalItf } from "@modHospital/interface";
import { HospitalRsv } from "@modHospital/resolver";
import { BaseSrv } from "@srcBase/service";

export class HospitalSrv extends BaseSrv<HospitalItf> {
	private static _instance: HospitalSrv;

	constructor() {
		super(HospitalRsv.instance);
	}

	public static get instance(): HospitalSrv {
		return this._instance || (this._instance = new this());
	}
}
