import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export function UploadFileHlp(file: UploadedFile, folder: string = "users") {
	return new Promise((resolve, reject) => {
		const uuidname = `${uuidv4()}-${file.name}`;
		const path2 = path.join(__dirname, "../../uploads", `/${folder}`, uuidname);

		// Use the mv() method to place the file somewhere on your server
		file.mv(path2, (err) => {
			if (err) return reject(err);
			return resolve(true);
		});
	});
}
