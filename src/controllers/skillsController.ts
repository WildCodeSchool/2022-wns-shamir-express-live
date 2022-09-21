import express, { Request, Response, Router } from "express";
import Skill from "../models/Skill";
import * as service from "../services/skillsService";

const router: Router = express.Router();

// Get all skills
router.get("/", async (request: Request, response: Response) => {
  const skills: Skill[] = await service.getAll();
  response.send(skills);
});

// Create a skill
router.post("/", async (request: Request, response: Response) => {
  const skill: Skill = await service.create(request.body.name);
  response.send(skill);
});

// Update a skill
router.put("/:id", async (request: Request, response: Response) => {
  try {
    const skill: Skill | null = await service.update(
      request.body.name,
      parseInt(request.params.id)
    );
    response.send(skill);
  } catch (e: any) {
    response.send(e.message);
  }
});

export default router;
