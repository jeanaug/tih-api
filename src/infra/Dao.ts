import mongoose, { Document, Model, DocumentQuery } from "mongoose";

const errMessage: { [key: number]: string } = {
  0: "Ocorreu um erro no banco de dados.",
  1:"O campo _id é obrigatório para executar esta operação",
  11000: "Usuário já cadastrado",
};
export default class Dao {
  private model: Model<Document>;

  constructor(name: string) {
    this.model = mongoose.model(name);
  }

  add = async (document: Document) => {
    document.save((err: any, doc: Document) => {
      if (err) {
        throw new Error(errMessage[!err.code ? 0 : err.code]);
      }
      return doc;
    });
  };

  find = async (conditions: object = {}) => {
    try {
      return await this.model.find(conditions);
    } catch (err) {
      console.log(err);
      throw new Error(errMessage[0]);
    }
  };

  findById = async (id:String) => {
   try {
     return await this.model.findById({_id:id});
   } catch (err) {
     console.log(err);
     throw new Error(errMessage[0]);
   }
 };


  update = async (document: Document) => {
   if (!document._id) {
      throw new Error(errMessage[0]);
    }
   try {
      return await this.model.findOneAndUpdate({_id:document._id}, document,{new:true});  
   } catch (error) {
      throw new Error(errMessage[0]);
   }
    
  };
}
