import jwt, { SignOptions, Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "supersecretjwtkey";
const JWT_EXPIRES_IN = "1h" as const; 

export class AuthService {
  static generateToken(payload: object) {
    const options: SignOptions = { expiresIn: JWT_EXPIRES_IN };
    return jwt.sign(payload, JWT_SECRET, options);
  }

  static verifyToken(token: string) {
    console.log("Verifying token:", token);
    return jwt.verify(token, JWT_SECRET);
  }

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  
}
