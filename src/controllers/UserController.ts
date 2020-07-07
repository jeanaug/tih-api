import { User } from "../models/User";
import { Request, Response } from "express";

const errMessage: { [key: number]: string } = {
  0: "database error",
  1: "field _id is required",
  2: "invalid parameters",
  11000: "user already exists",
};

const isValid = (body: any): boolean =>
  body.userName && body.email && body.password ? true : false;

export default class UserController {
  async add(req: Request, res: Response) {
    console.log('req.body',req.body);
    if (isValid(req.body)) {
      try {
        const user = await User.create(req.body);        
        return res.status(200).send({user});
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .send({ error: errMessage[(err.code = 11000 ? err.code : 0)] });
      }
    } else {
      res.status(400).send({ error: errMessage[2] });
    }
  }
  async get(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.status(200).send({users});
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: errMessage[0] });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params._id);
      res.status(200).send({user});
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: errMessage[0] });
    }
  }

  async getByEmail(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.params.email });
      res.status(200).send({user});
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: errMessage[0] });
    }
  }

  async update(req: Request, res: Response) {
    if (isValid(req.body)) {
      try {
        const _id: String = req.body._id;
        const user = await User.findOneAndUpdate({ _id: _id }, req.body, {
          new: true,
        });
        return res.status(200).send({user});
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    }
  }
}
