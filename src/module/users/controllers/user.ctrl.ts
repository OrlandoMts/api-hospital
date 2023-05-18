import { BaseCtrl } from "../../../base/controller";
import { UserItf } from "../interface/user.itf";
import { UserSrv } from "../services";

export class UserCrl extends BaseCtrl<UserItf> {
	private static _instance: UserCrl;
	private _userSrv: UserSrv = UserSrv.instance;

	constructor() {
		super(UserSrv.instance);
	}

	public static get instance(): UserCrl {
		return this._instance || (this._instance = new this());
	}
}

export default UserCrl;
