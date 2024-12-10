import { UserService } from "./UserService"

export class AuthService {
  static async login({ email, password }) {
    const user = await UserService.findBy({ email, password })
    if (!user) {
      throw new Error("Invalid email or password")
    }
    return user
  }

  static async register(user) {
    return await UserService.create(user)
  }

  static async logout() {
    localStorage.removeItem("userId")
  }
}
