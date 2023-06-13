import { MSG_ERR_SERV } from "@messages/index";
import { genJwt } from "@srcBase/helper";
import { BaseRsv } from "@srcBase/resolver";
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

	public override async create(entity: UserItf): Promise<any> {
		try {
			const user = await (this._userRsv as BaseRsv<UserItf>).create(entity);
			const token = await genJwt(user._id as string);

			return {
				data: user,
				token,
			};
		} catch (error: any) {
			throw new Error(MSG_ERR_SERV(error));
		}
	}
}

export default UserSrv;
