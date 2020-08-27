import mongoose from "mongoose";

const addressShema  = new mongoose.Schema({

}); 
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  gender: {
    type: String,
    enum: ["Feminino", "Masculino"],
  },
  cpf: {
    type: String,
    maxlength: 14,
  },
  rg: {
    type: String,
    maxlength: 12,
  },
  birthDate:{
      type:Date,      
  },
  cellPhone:{
      type:String,
      maxlength:15
  },
  createdAt: { type: Date, default: Date.now },
  address:[{
    cep :{type:String, maxlength:8},
    street:{type:String},
    neighborhood:{type:String},
    city:{type:String},
    state:{type:String},  
    number:{type:String} ,
    complement:{type:String}       
  } ],
  imported:{type:Boolean,default:false}

});
const Person =mongoose.models.Person || mongoose.model("Person",personSchema);

export default Person