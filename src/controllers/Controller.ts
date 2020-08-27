import { Request, Response } from "express";
import mongoose, { Model, Document } from "mongoose";

export default class Controller {
  private model: Model<Document>;
  public errMessage: { [key: number]: string } = {
    0: "database error",
    1: "field _id is required",
    2: "invalid parameters",
    3: "not find",
    11000: "already exists",
  };

  constructor(model: Model<Document>) {
    this.model = model;
  }

  async add(req: Request, res: Response) {
    try {
      delete req.body._id;
      const obj = await this.model.create(req.body);
      return res.status(200).send({ data: obj });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        error: `${this.model.modelName} ${
          this.errMessage[(err.code = 11000 ? err.code : 0)]
        }`,
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const objects = await this.model.find();

      if (req.query.paginated == "true")
        return this.getWithPagination(req, res);

      res.status(200).send({ [this.model.modelName]: objects });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send({ error: `${this.model.modelName} ${this.errMessage[0]}` });
    }
  }

  async getWithPagination(req: Request, res: Response) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchBy = req.query.searchBy as Array<any>;
    const textSearch = <string>req.query.textSearch;

    const regexp = new RegExp(textSearch, "i");

    const $or = searchBy.map((o) => {
      return { [o]: regexp };
    });

    try {
      const objects = await this.model
        .find({ $or })
        .lean()
        .then((value) => {
          if (value.length == 0)
            return res.status(200).send({ message: this.errMessage[3] });
          const count = value.length;

          const start = limit * page;
          const end = 100;

          value = value.slice((page - 1) * limit, page * limit);

          res.status(200).send({ data: value, totalRows: count });
        });
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send({ error: `${this.model.modelName} ${this.errMessage[0]}` });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const obj = await this.model.findById(req.params._id);
      res.status(200).send({ data: obj });
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: this.errMessage[0] });
    }
  }
  async getByCellPhone(req: Request, res: Response) {
    try {
      const obj = await this.model.findOne({ cellPhone: req.params.cellPhone });

      res.status(200).send({ data: obj });
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: this.errMessage[0] });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const _id: String = req.body._id;
      const obj = await this.model.findOneAndUpdate({ _id: _id }, req.body, {
        new: true,
      });
      return res.status(200).send({ data: obj });
    } catch (err) {
      console.log(err);
      res.status(400).send({ error: this.errMessage[0] });
    }
  }
}
