import express from "express";
import cors from "cors";
import { dataSource } from "./tools/utils";
import wilderController from "./controllers/wilderController";
import skillsController from "./controllers/skillsController";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json());

app.use("/api/wilders", wilderController);
app.use("/api/skills", skillsController);

app.listen(5001, async () => {
  await dataSource.initialize();
  console.log("Server launch on http://localhost:5001");
});
