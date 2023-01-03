import path from 'path';
import fs from 'fs';
import { Types } from 'mongoose';
import bcrypt from 'bcryptjs';

const pathKeys = path.join(__dirname, '..', '..', 'keys/');
export const PRIVATE_KEY = fs.readFileSync(`${pathKeys}PC_IO_private_key.pem`, 'utf8');
export const PUBLIC_KEY = fs.readFileSync(`${pathKeys}PC_IO_public_key.pem`, 'utf8');

export const SIGN_OPTION_JW = {
  issuer: process.env.JWT_issuer,
  subject: process.env.JWT_subject,
  audience: process.env.JWT_audience,
  expiresIn: process.env.JWT_expiresIn,
  algorithm: process.env.JWT_algorithms,
};

// Genera un ID unico
export const generateCodeUnique = () => new Types.ObjectId();

export const passworBcrypt = async (password: string) => {
  const salt = await bcrypt.genSalt(11);
  return bcrypt.hash(password, salt);
};

export const obscureEmail = (email: string) => {
  const [name, domain] = email.split('@');
  return `${name[0]}${new Array(name.length > 6 ? name.length - 3 : name.length).join('*')}${name.length > 6 ? name.slice(name.length - 3, name.length) : ''}@${domain}`;
};
