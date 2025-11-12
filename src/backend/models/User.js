import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
const { genSalt, hash, compare } = bcrypt;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  isHost: { type: Boolean, default: false },
  avatar: { type: String }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

export default model('User', UserSchema);
