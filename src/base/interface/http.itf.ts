export interface HTTPResItf<T> {
	ok: boolean;
	status: number;
	message: string;
	data: Array<EDHTTPResItf<T>> | T;
}

export interface EDHTTPResItf<T> {
	token?: string;
	page?: number;
	data: T;
	total?: number;
	pages?: number;
}
export interface HTTPPaginationItf<T> {
	page?: number;
	data: Array<T>;
	total?: number;
	pages?: number;
}
