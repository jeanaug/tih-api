import { User } from "../models/User";
import { Request, Response } from "express";
import Controller from "./Controller";

export default class UserController extends Controller {

  constructor(){
    super(User);
  }

  async getByEmail(req: Request, res: Response) {
    try {
      const user = await User.findOne({ email: req.params.email });
      res.status(200).send({user});
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: super.errMessage[0] });
    }
  }
}
