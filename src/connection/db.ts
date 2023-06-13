import { ConnectOptions, Connection, createConnection } from "mongoose";

import { DB_CNN } from "../base/config/index";
import { MSG_CONNECTION_FAILED, MSG_CONNECTION_SUCCES } from "../messages/msgs";

export class DatabaseConnection {
	private static _instance: DatabaseConnection;
	private _options: ConnectOptions = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	} as ConnectOptions;

	public mongoUserDB1!: Connection;
	public mongoUserDB2!: Connection;

	constructor() {
		this.mongoUserDB1 = this.connect(DB_CNN || "none");
		this.mongoUserDB2 = this.connect(DB_CNN || "none");
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
			throw new Error(MSG_CONNECTION_FAILED);
		}
	}
}
