import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import { FileSavedType } from "@srcBase/interface";

export function UploadFileHlp(
	file: UploadedFile,
	folder: string = "users"
): Promise<FileSavedType> {
	return new Promise((resolve, reject) => {
		const uuidname = `${uuidv4()}-${file.name}`;
		const pathserver = path.join(
			__dirname,
			"../../uploads",
			`/${folder}`,
			uuidname
		);

		// Use the mv() method to place the file somewhere on your server
		file.mv(pathserver, (err) => {
			if (err) return reject(err);
			return resolve({
				uuidname,
				pathserver,
			});
		});
	});
}
