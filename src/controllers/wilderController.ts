import express, { Request, Response } from "express";
import Wilder from "../models/Wilder";
import service from "../services/wilderService";

const router = express.Router();

// GET /api/wilders
router.get("/", async (request: Request, response: Response) => {
  const wilders: Wilder[] = await service.getAll();
  response.send(wilders);
});

// POST /wilders
// BODY {}
router.post("/", async (request: Request, response: Response) => {
  try {
    const wilderRequest: Wilder = request.body;
    const wilderCreated: Wilder = await service.create(wilderRequest);
    response.send(wilderCreated);
  } catch (e) {
    response.send("ERROR");
  }
});

// PUT /wilders/4
// BODY {}
router.put("/:id", async (request: Request, response: Response) => {
  const wilderId: number = parseInt(request.params.id);
  const wilderRequest: Wilder = request.body;
  const wilderUpdated: Wilder | null = await service.update(
    wilderRequest,
    wilderId
  );
  response.send(wilderUpdated);
});

// DELETE /wilders/6
router.delete("/:id", async (request: Request, response: Response) => {
  const wilderId: number = parseInt(request.params.id);
  await service.delete(wilderId);
  response.sendStatus(204);
});

router.post(
  "/:id/skills/:skillId",
  async (request: Request, response: Response) => {
    try {
      const wilderId: number = parseInt(request.params.id);
      const skillId: number = parseInt(request.params.skillId);
      const wilder: Wilder = await service.addSkill(skillId, wilderId);
      response.send(wilder);
    } catch (e: any) {
      response.send(e.message);
    }
  }
);

export default router;
