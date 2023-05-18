import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || "1705";
export const DB_CNN = process.env.DB_CNN || "-";
export const UPLOAD_SIZE = process.env.UPLOAD_SIZE || "900mb";
