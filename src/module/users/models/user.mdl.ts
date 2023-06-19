import { ROLES } from "@srcBase/secure";
import { Schema } from "mongoose";
import { DatabaseConnection } from "../../../connection/db";
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
		role: [
			{
				type: String,
				required: true,
				default: ROLES.NEW_USER,
				enum: Object.values(ROLES),
			},
		],
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

UserSchema.method("toJSON", function () {
	const { __v, status, password, ...obj } = this.toObject();
	return obj;
});

export const UserMod = DatabaseConnection.instance.mongoUserDB1.model<UserItf>(
	"user",
	UserSchema,
	"user"
);

export default UserMod;
