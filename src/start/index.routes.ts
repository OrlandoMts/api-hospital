import { Router } from "express";

import { DoctorRoutes } from "@modDoctor/routes";
import { UploadsRouter } from "@modUploads/routes";
import { HospitalRoutes } from "../module/hospital/routes/index";
import { LoginRoutes } from "../module/login/routes/index";
import UserRouter from "../module/users/routes/user.routes";

export class AppRouter {
	private static _instance: AppRouter;
	private _appRouter: Router;

	constructor() {
		this._appRouter = Router();
	}

	public static get instance(): AppRouter {
		return this._instance || (this._instance = new this());
	}

	public setRouter(): Router {
		this._appRouter.use("/users", UserRouter.instance.setRouter());
		this._appRouter.use("/login", LoginRoutes.instance.setRouter());
		this._appRouter.use("/hospital", HospitalRoutes.instance.setRouter());
		this._appRouter.use("/doctor", DoctorRoutes.instance.setRouter());
		this._appRouter.use("/uploads", UploadsRouter.instance.setRouter());
		return this._appRouter;
	}
}

export default AppRouter;
