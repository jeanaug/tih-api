import mongoose from "mongoose";
import bcrypt  from 'bcryptjs';
interface IUser extends mongoose.Document {
  password: string
}
const SALT_WORK_FACTOR = 10;
const userSchema = new mongoose.Schema({
  userName: {type:String,required:true},
  email: { type: String, unique: true, lowercase:true ,required:true},
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre<IUser>('save',async function(next){  
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password=await bcrypt.hash(this.password,salt);
  next();

})

export const User = mongoose.models.User || mongoose.model("User", userSchema);
