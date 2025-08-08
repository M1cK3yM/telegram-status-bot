import express from "express";
import cors from "cors";
import { router as statusRouter } from "./routes/status_route";
import dotenv from 'dotenv';
import { bot } from "./commands";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(statusRouter);

const port = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
bot.launch();
