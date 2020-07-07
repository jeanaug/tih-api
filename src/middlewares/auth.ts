import { Response, NextFunction } from "express";
import RequestCustom from "../models/requestCustom";
import Token from "../util/Token";
export default (req: RequestCustom, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "no toke provided" });

  const parts: string[] = authHeader.split(" ");

  if (parts.length < 2) res.status(401).send({ error: "token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    res.status(401).send({ error: "token malformatted" });

  try {
    const payLoad = Token.verify(token);
    req.userId = payLoad.id;
    next();
  } catch (error) {
    res.status(401).send({ error: error });
  }
};
