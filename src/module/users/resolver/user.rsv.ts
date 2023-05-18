import { Document, Model } from "mongoose";

import { BaseRsv } from "../../../base/resolver";
import { UserItf } from "../interface/user.itf";
import UserMod from "../models/user.mdl";

export class UserRsv extends BaseRsv<UserItf> {
	private static _instance: UserRsv;
	private _userMod: Model<Document> | any = UserMod;

	constructor() {
		super(UserMod, "UserMod");
	}

	public static get instance(): UserRsv {
		return this._instance || (this._instance = new this());
	}
}

export default UserRsv;
