import mongoose from "mongoose";
export type UserDocument = mongoose.Document & {
  userName: string;
  email: string;
  password: string;
};

const userSchema =  new mongoose.Schema({
    userName:String,
    email:{type:String,unique:true},
    password:String
});

export const User=mongoose.model<UserDocument>('User',userSchema);