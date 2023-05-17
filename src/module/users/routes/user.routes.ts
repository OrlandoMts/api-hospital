import { Request, Response, Router } from "express";

import { UserCrl } from "../controllers";

export class UserRouter {
	private static _instance: UserRouter;
	private router: Router;
	private _userCrl: UserCrl = UserCrl.instance;

	constructor() {
		this.router = Router();
	}

	public static get instance(): UserRouter {
		return this._instance || (this._instance = new this());
	}

	public setRouter(): Router {
		this.router.get("/", (req: Request, res: Response) =>
			this._userCrl.getAll(req, res)
		);

		return this.router;
	}
}

export default UserRouter;
