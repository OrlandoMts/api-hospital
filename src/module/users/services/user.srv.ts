import { BaseSrv } from "../../../base/service";
import { UserItf } from "../interface/user.itf";
import { UserRsv } from "../resolver/index";

export class UserSrv extends BaseSrv<UserItf> {
	private static _instance: UserSrv;
	private _userRsv: UserRsv = UserRsv.instance;

	constructor() {
		super(UserRsv.instance);
	}

	public static get instance(): UserSrv {
		return this._instance || (this._instance = new this());
	}
}

export default UserSrv;
