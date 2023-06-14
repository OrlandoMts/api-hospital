import { Schema } from "mongoose";

import { HospitalItf } from "@modHospital/interface";
import UserMod from "@modUsers/models/user.mdl";
import { BasePopItf } from "@srcBase/interface";
import { DatabaseConnection } from "../../../connection/db";

const HospitalSchema = new Schema<HospitalItf>(
	{
		name: {
			type: String,
			required: true,
		},
		img: {
			type: String,
			required: false,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		status: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	{
		timestamps: { createdAt: "created", updatedAt: "updated" },
		autoCreate: true,
	}
);

HospitalSchema.method("toJSON", function () {
	const { __v, status, ...obj } = this.toObject();
	return obj;
});

HospitalSchema.pre("save", async function (next): Promise<any> {
	try {
		await this.populate(HospitalPop);
	} catch (error: any) {
		next();
	}
});

export const HospitalMod =
	DatabaseConnection.instance.mongoUserDB3.model<HospitalItf>(
		"hospital",
		HospitalSchema,
		"hospital"
	);

export const HospitalPop: Array<BasePopItf> = [
	{
		path: "author",
		match: { status: true },
		select: "-__v -status -password",
		model: UserMod,
		options: { strictPopulate: false },
	},
];

export default HospitalMod;
