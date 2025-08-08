import express from "express";
import cors from "cors";
import { router as statusRouter } from "./routes/status_route";

const app = express();
app.use(cors());
app.use(express.json());
app.use(statusRouter);

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
