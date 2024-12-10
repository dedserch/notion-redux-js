import { instance } from "../api/axios"

export class UserService {
  static async create(user) {
    const userWithTimestamp = {
      ...user,
      createdAt: new Date().toISOString(),
    }
    const response = await instance.post("/users", userWithTimestamp)
    return response.data
  }

  static async findBy(params) {
    const response = await instance.get("/users", { params })
    return response.data[0] || null
  }
}
