import { User, UserDocument } from "../models/User";
import { Request, Response, NextFunction } from "express";
import Dao from "../infra/Dao";
const isValid = (body: any): boolean =>
  body.userName && body.email && body.password ? true : false;
const dao: Dao = new Dao("User");

const createInstanceUser = (req: Request) => {
  return new User({
    _id: req.body.id,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
};

export default class UserController {
  add(req: Request, res: Response, next: NextFunction) {
    if (isValid(req.body)) {
      const user = dao.add(createInstanceUser(req));
      try {
        return res.status(200).send(user);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  }
  async get(req: Request, res: Response) {
    try {
      const users = await dao.find();
      res.status(200).send(users);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await dao.findById(req.params._id);
      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  async getByEmail(req: Request, res: Response) {
    try {
      const user = await dao.find({ email: req.params.email });
      res.status(200).send(user[0]);
    } catch (err) {
      res.status(400).send(err);
    }
  }


  async update(req: Request, res: Response, next: NextFunction) {
    
    if (isValid(req.body)) {
      try {
        const user = await dao.update(req.body);
        return res.status(200).send(user);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  }
}
