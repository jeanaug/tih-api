import { Express, Request, Response } from "express";
import PersonController from "../controllers/PersonController";
import authMiddleware from "../middlewares/auth";
const controller = new PersonController();
const url = "/person";
// export const personRoute = (app:Express)=>{
//     app.post(url,( req:Request,res:Response)=>{
//         personController.add(req,res);
//     });
// }

export const personRoute = (app: Express) => {
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

  app.get(`${url}/cellPhone/:cellPhone`, authMiddleware, (req: Request, res: Response) =>
  controller.getByCellPhone(req, res)
);


};
