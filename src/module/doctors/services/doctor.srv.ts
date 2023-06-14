import { DoctorItf } from "@modDoctor/interface";
import { DoctorRsv } from "@modDoctor/resolver";
import { BaseSrv } from "@srcBase/service";

export class DoctorSrv extends BaseSrv<DoctorItf> {
	private static _instance: DoctorSrv;

	constructor() {
		super(DoctorRsv.instance);
	}

	public static get instance(): DoctorSrv {
		return this._instance || (this._instance = new this());
	}
}
