import { Document, Model } from "mongoose";

import { MSG_ERR_SERV } from "@messages/msgs";
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

	public async findUserByEmail(email: string): Promise<UserItf> {
		try {
			return await this._userMod
				.findOne({ email: email, status: true })
				.populate(this.getPopulate());
		} catch (error: any) {
			throw new Error(MSG_ERR_SERV(error));
		}
	}
}

export default UserRsv;
