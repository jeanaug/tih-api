import { Request } from "express";

export default interface RequesteCustom extends Request {
  userId: String;
}
