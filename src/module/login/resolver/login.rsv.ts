import { Model } from "mongoose";

import { BaseRsv } from "@srcBase/resolver";
import { LoginItf } from "../interface";
import { LoginMod } from "../models";

export class LoginRsv extends BaseRsv<LoginItf> {
	private static _instance: LoginRsv;
	private _loginMod: Model<Document> | any = LoginMod;

	constructor() {
		super(LoginMod, "LoginMod");
	}

	public static get instance(): LoginRsv {
		return this._instance || (this._instance = new this());
	}
}

export default LoginRsv;
