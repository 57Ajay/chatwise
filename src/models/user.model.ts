import mongoose from "mongoose";
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date },
  profilePicture: { type: String }
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);
export default User;