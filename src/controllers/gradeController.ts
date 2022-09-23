import express, { Request, Response, Router } from "express";
import Grade from "../models/Grade";
import * as service from "../services/gradesService";

const router: Router = express.Router();

// Get all skills
router.post("/", async (request: Request, response: Response) => {
  console.log(request.body);
  const wilderId: number = parseInt(request.body.wilder_id);
  const skillId: number = parseInt(request.body.skill_id);
  const votes: number = parseInt(request.body.votes);

  const grade: Grade = await service.save(wilderId, skillId, votes);
  response.send(grade);
});

export default router;
