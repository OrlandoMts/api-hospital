import { Schema } from "mongoose";

import { DatabaseConnection } from "../../../connection/db";

import { DoctorItf } from "../interface/doctor.itf";

const DoctorSchema = new Schema<DoctorItf>(
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
		hospital: {
			type: Schema.Types.ObjectId,
			ref: "hospital",
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

DoctorSchema.method("toJSON", function () {
	const { __v, status, ...obj } = this.toObject();
	return obj;
});

export const DoctorMod =
	DatabaseConnection.instance.mongoUserDB4.model<DoctorItf>(
		"doctors",
		DoctorSchema,
		"doctors"
	);

export default DoctorMod;
