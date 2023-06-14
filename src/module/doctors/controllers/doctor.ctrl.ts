import { DoctorItf } from "@modDoctor/interface";
import { DoctorSrv } from "@modDoctor/services";
import { BaseCtrl } from "@srcBase/controller";

export class DoctorCtrl extends BaseCtrl<DoctorItf> {
	private static _instance: DoctorCtrl;

	constructor() {
		super(DoctorSrv.instance);
	}

	public static get instance(): DoctorCtrl {
		return this._instance || (this._instance = new this());
	}
}
