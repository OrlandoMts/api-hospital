import { HospitalItf } from "@modHospital/interface";
import { HospitalSrv } from "@modHospital/services";
import { BaseCtrl } from "@srcBase/controller";

export class HospitalCtrl extends BaseCtrl<HospitalItf> {
	private static _instance: HospitalCtrl;

	constructor() {
		super(HospitalSrv.instance);
	}

	public static get instance(): HospitalCtrl {
		return this._instance || (this._instance = new this());
	}
}
