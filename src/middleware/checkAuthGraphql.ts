import jwt from 'jsonwebtoken';
import path from 'path';
import fs from 'fs';
import { env } from '../config/env';

const pathKey = path.join(__dirname, '..', '..', 'keys/');

interface OptionJwt {
    issuer: any;
    subject: any;
    audience: any;
    maxAge: any;
    algorithms: any;
}

const checkAuthGraphql = async (req: any, res: any, next: any) => {
  // Extract Authorization Header
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // Extract the token and check for token
  const token = authHeader.split(' ')[1];
  if (!token || token === '') {
    req.isAuth = false;
    return next();
  }

  const PUBLIC_KEY = fs.readFileSync(`${pathKey}PC_IO_public_key.pem`, 'utf8');

  const verifyOptions: OptionJwt = {
    issuer: env.JWTIssuer,
    subject: env.JWTSubject,
    audience: env.JWTAudience,
    maxAge: env.JWTExpiresIn,
    algorithms: env.JWTAlgorithms,
  };

  // Verify the extracted token
  let decodedToken: any;
  try {
    decodedToken = jwt.decode(token, { complete: true });
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  // If decoded token is null then set authentication of the request false
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  const { _id } = decodedToken.payload.user;

  jwt.verify(token, PUBLIC_KEY, verifyOptions, (err: any) => {
    if (err) {
      req.isAuth = false;
      return next();
    }

    req.isAuth = true;
    req.userId = _id;
    return next();
  });
};

export default checkAuthGraphql;
