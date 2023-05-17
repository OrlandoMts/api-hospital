import express, { Application, Router } from "express";
import http, { createServer } from "http";

import cors from "cors";
import dotenv from "dotenv";

import { DatabaseConnection } from "../connection/db";
import { MSG_RUN_ON_PORT } from "../messages/msgs";
import AppRouter from "./index.routes";

export class AppServer {
	private static _instance: AppServer;
	private _app: Application;
	private _router: Router;
	private _httpSrv: http.Server;
	private _dotenv: dotenv.DotenvConfigOutput;

	constructor() {
		this._dotenv = dotenv.config();
		this._app = express();
		this._httpSrv = createServer(this._app);
		this._router = Router();
	}

	public static get instance(): AppServer {
		return this._instance || (this._instance = new this());
	}

	private middlewares(): void {
		this._app.use(cors());
	}

	private router() {
		this._router.use("/v1/api/", AppRouter.instance.setRouter());
		this._app.use(this._router);
	}

	private listen(): void {
		this._httpSrv.listen(process.env.PORT, () => {
			console.log(`${MSG_RUN_ON_PORT} ${process.env.PORT}`);
		});
	}

	public async run(): Promise<void> {
		DatabaseConnection.instance;
		this.middlewares();
		this.router();
		this.listen();
	}
}

export default AppServer;
