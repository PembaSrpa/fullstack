import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { db } from "./database/db.js";
import userRouter from "./routers/userRouter.js";

const app = express();
configDotenv();
app.use(cors());
app.use(express.json());
app.use("/api", userRouter);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
