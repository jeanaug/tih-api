import jwt, { decode } from "jsonwebtoken";
import { JwtPayload } from "../types/jwtPayload";
export default abstract class Token {
  static generate(id: string): string {
    const payload: JwtPayload = { id: id };
    return jwt.sign(payload, process.env.SECRET, {
      expiresIn: process.env.EXPIRES_TOKEN_IN,
    });
  }
  static verify(token: string): JwtPayload {
    let ret;
    jwt.verify(token, process.env.SECRET, (err, decoded: JwtPayload) => {
      if (err) {
        console.log(err);
        throw new Error("invalid token");
      }

      ret = decode;
    });

    return ret;
  }
}
