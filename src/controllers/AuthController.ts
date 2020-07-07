import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import Token from "../util/Token";

export default class AuthController {
  authenticate = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email }).select("+password");
      if (!user) return res.status(400).send({ error: "user not found" });

      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send({ error: "invalid password" });

      user.password = undefined;

      const token = Token.generate(user._id);

      return res.send({ user, token });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "authentication falied" });
    }
  };
}
