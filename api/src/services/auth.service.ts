import { AuthService } from "../utils/authService";
import { AuthRepository } from "../repositories/auth.repository";

export class AuthBusiness {
  static async signup(name:string, email: string, password: string) {
    const hashed = await AuthService.hashPassword(password);
    await AuthRepository.createUser(name, email, hashed);
  }

  static async login(email: string, password: string) {
    const user = await AuthRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const match = await AuthService.comparePassword(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    return AuthService.generateToken({ id: user.id, email: user.email });
  }
}
