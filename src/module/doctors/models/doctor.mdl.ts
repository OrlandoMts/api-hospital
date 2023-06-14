import { Schema } from "mongoose";

import { DatabaseConnection } from "../../../connection/db";

import HospitalMod from "@modHospital/models/hospital.mdl";
import UserMod from "@modUsers/models/user.mdl";
import { BasePopItf } from "@srcBase/interface";
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
			required: true,
		},
		hospital: {
			type: Schema.Types.ObjectId,
			ref: "hospital",
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

DoctorSchema.method("toJSON", function () {
	const { __v, status, ...obj } = this.toObject();
	return obj;
});

DoctorSchema.pre("save", async function (next): Promise<any> {
	try {
		await this.populate(DoctorPop);
	} catch (error) {
		next();
	}
});

export const DoctorMod =
	DatabaseConnection.instance.mongoUserDB4.model<DoctorItf>(
		"doctors",
		DoctorSchema,
		"doctors"
	);

export const DoctorPop: Array<BasePopItf> = [
	{
		path: "author",
		match: { status: true },
		select: "-__v -status -password",
		model: UserMod,
		options: { strictPopulate: false },
	},
	{
		path: "hospital",
		match: { status: true },
		select: "-__v -status -password",
		model: HospitalMod,
		options: { strictPopulate: false },
	},
];

export default DoctorMod;
