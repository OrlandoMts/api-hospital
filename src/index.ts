import express from "express";

import cors from "cors";
import dotenv from "dotenv";

import { DatabaseConnection } from "./connection/db";
import { MSG_RUN_ON_PORT } from "./messages/msgs";

dotenv.config();
const app = express();

app.use(cors());

DatabaseConnection.instance;

app.get("/", (req, res) => {
	res.json({
		ok: true,
		msg: "hola mundo",
	});
});

app.listen(process.env.PORT, () => {
	console.log(`${MSG_RUN_ON_PORT} ${process.env.PORT}`);
});
