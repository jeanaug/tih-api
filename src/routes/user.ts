import { Express, Request, Response } from "express";
import UserController from "../controllers/UserController";
import authMiddleware from "../middlewares/auth";
const controller = new UserController();
const url = "/user";

export const userRoute = (app: Express) => {
  app
    .route(url)
    .post(authMiddleware, (req: Request, res: Response) =>
      controller.add(req, res)
    )
    .get(authMiddleware, (req: Request, res: Response) =>
      controller.get(req, res)
    )
    .put(authMiddleware, (req: Request, res: Response) =>
      controller.update(req, res)
    );

  app.get(`${url}/:_id`, authMiddleware, (req: Request, res: Response) =>
    controller.getById(req, res)
  );

  app.get(`${url}/email/:email`, authMiddleware, (req: Request, res: Response) =>
    controller.getByEmail(req, res)
  );

  
  

  
};
