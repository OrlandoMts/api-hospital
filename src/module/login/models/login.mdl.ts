import { Schema } from "mongoose";

import { DatabaseConnection } from "../../../connection/db";
import { LoginItf } from "../interface";

const LoginSchema: Schema = new Schema<LoginItf>(
	{
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		status: { type: Boolean, required: false, default: true },
	},
	{
		timestamps: { createdAt: "created", updatedAt: "updated" },
		autoCreate: true,
	}
);

LoginSchema.method("toJSON", function () {
	const { __v, status, password, ...obj } = this.toObject();
	return obj;
});

export const LoginMod =
	DatabaseConnection.instance.mongoUserDB2.model<LoginItf>(
		"login",
		LoginSchema,
		"login"
	);

export default LoginMod;
