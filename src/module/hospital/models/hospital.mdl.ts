import { Schema } from "mongoose";

import { HospitalItf } from "@modHospital/interface";
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

export const HospitalMod =
	DatabaseConnection.instance.mongoUserDB3.model<HospitalItf>(
		"hospital",
		HospitalSchema,
		"hospital"
	);

export default HospitalMod;
