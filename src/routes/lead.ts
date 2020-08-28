import { Express, Request, Response } from "express";
import LeadController from "../controllers/LeadController";
import authMiddleware from "../middlewares/auth";
const controller = new LeadController();
const url = "/lead";

export const leadRoute = (app: Express) => {
  app
    .route(url)
    .post((req: Request, res: Response) => controller.add(req, res))
    .get(authMiddleware, (req: Request, res: Response) =>
      controller.get(req, res)
    )
    .put(authMiddleware, (req: Request, res: Response) =>
      controller.update(req, res)
    );

  app.get(`${url}/:_id`, authMiddleware, (req: Request, res: Response) =>
    controller.getById(req, res)
  );
};
