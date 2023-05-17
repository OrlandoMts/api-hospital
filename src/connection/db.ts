import { ConnectOptions, Connection, createConnection } from "mongoose";
import { env } from "node:process";

import { MSG_CONNECTION_FAILED, MSG_CONNECTION_SUCCES } from "../messages/msgs";

export class DatabaseConnection {
	private static _instance: DatabaseConnection;
	private _options: ConnectOptions = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	} as ConnectOptions;

	constructor() {
		this.connect(env?.DB_CNN || "");
	}

	public static get instance(): DatabaseConnection {
		return this._instance || (this._instance = new this());
	}

	public connect(name: string): Connection {
		try {
			const mongoCON = createConnection(name, this._options);
			console.log(MSG_CONNECTION_SUCCES);
			return mongoCON;
		} catch (error) {
			console.log(error);
			throw new Error(MSG_CONNECTION_FAILED);
		}
	}
}
