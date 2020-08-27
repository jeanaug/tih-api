import { Express, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import Person from "../models/person";
import DateHelper from "../helpers/DateHelper";
const url = "/import";

export const importPersonRoute = (app: Express) => {
  app.route(url).post(async (req: Request, res: Response) => {
    const importPersonSchema = new Schema(
      {
        name: String,
        cpf: String,
        rg: String,
        birthDate: String,
        cellPhone: String,
        createdAt: String,
        cep: String,
        street: String,
        neighborhood: String,
        city: String,
        state: String,
        number: String,
        complement: String,
      },
      { strict: false }
    );
    const ImportPerson = mongoose.model("Cli", importPersonSchema, "Cli_");

    const importedPerson = await ImportPerson.find();

    
    await Person.collection.drop();
    importedPerson.forEach(async (p: any) => {        

        try {
            await Person.create({
                name: p.name,
                cpf: p.cpf || undefined,
                rg: p.rg || undefined,
                birthDate: Date.parse(p.birthDate) || undefined,
                cellPhone: p.cellPhone || undefined,
                createdAt: DateHelper.toDate(p.createdAt) || undefined,
                imported: true,
                address: [
                  {
                    cep: p.cep.replace(/-/, "") || undefined,
                    street: p.street || undefined,
                    neighborhood: p.neighborhood || undefined,
                    city: p.city || undefined,
                    state: p.state || undefined,
                    number: p.number || undefined,
                    complement: p.complement || undefined,
                  },
                ],
              });
        } catch (error) {
            console.log(error);
        }

     
    });

    res.send();
  });
};

address: [
  {
    cep: { type: String, maxlength: 8 },
    street: { type: String },
    neighborhood: { type: String },
    city: { type: String },
    state: { type: String },
    number: { type: String },
    complement: { type: String },
  },
];
