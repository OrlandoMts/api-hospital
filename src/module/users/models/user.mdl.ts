import { Schema, model } from "mongoose";
import { UserItf } from "../interface/user.itf";

const UserSchema: Schema = new Schema<UserItf>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		img: {
			type: String,
		},
		role: {
			type: String,
			required: true,
			default: "ROLE_USER_NEW",
		},
		google: {
			type: Boolean,
			default: false,
		},
		status: { type: Boolean, required: false, default: true },
	},
	{
		timestamps: { createdAt: "created", updatedAt: "updated" },
		autoCreate: true,
	}
);

module.exports = model("user", UserSchema, "user");
