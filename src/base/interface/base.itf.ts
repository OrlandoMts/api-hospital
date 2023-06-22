import { Types } from "mongoose";

export interface BaseRsvItf {
	// get?: Function;
	getAll: Function;
	create: Function;
	// update?: Function;
	// inactive?: Function;
	// delete?: Function;
	findOne?: Function;
	// findAll?: Function;
	// findAllByQuery?: Function;
	// getByKey?: Function;
	// checkByKey?: Function;
	// countByQuery?: Function;
}

export interface BasePopItf {
	path: string;
	match: { status: boolean };
	select: string;
	populate?: BasePopItf | Array<BasePopItf>;
	model: any;
	options: PopOptItf;
}

export interface PopOptItf {
	strictPopulate: boolean;
}

export interface BaseEntityItf {
	_id?: string | Types.ObjectId;
	status?: boolean;
	created?: Date;
	updated?: Date;
}

export type FileSavedType = {
	uuidname: string;
	pathserver: string;
};
