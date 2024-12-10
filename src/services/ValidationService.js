import { z } from "zod"

export class ValidationService {
  static validateTitle(title) {
    const titleSchema = z.string().min(1, "Title cannot be empty")
    return titleSchema.safeParse(title).success
  }

  static validateEmail(email) {
    const emailSchema = z.string().email("Invalid email address")
    return emailSchema.safeParse(email).success
  }

  static validatePassword(password) {
    const passwordSchema = z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
    return passwordSchema.safeParse(password).success
  }

  static validatePasswordMatch(password, repeatPassword) {
    return password === repeatPassword
  }
}
