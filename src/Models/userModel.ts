import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
  },
  { timestamps: true },
);

const userModel = model('Users', userSchema);

export default userModel;
