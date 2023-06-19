import { SECRET_JWT } from "@srcBase/config";
import jwt from "jsonwebtoken";

export const genJwt = (
	uid: string,
	roles: Array<string>
): Promise<string | undefined> => {
	return new Promise((resolve, reject) => {
		const payload = {
			uid,
			roles,
		};

		jwt.sign(
			payload,
			SECRET_JWT as string,
			{
				expiresIn: "12h",
				algorithm: "HS256",
			},
			(err, encoded) => {
				err ? reject(err) : resolve(encoded);
			}
		);
	});
};
