import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../ui/Input"
import { Button } from "../../ui/Button"
import { register, login } from "../../../redux/user/action"
import { ValidationService } from "../../../services/ValidationService"
import { selectErrorUser } from "../../../redux/user/selectors"
import { VALIDATION_MESSAGES } from "../../../constants/validationMessage.constant"
import { useNavigate } from "react-router-dom"

export const AuthForm = () => {
  const dispatch = useDispatch()
  const error = useSelector(selectErrorUser)
  const navigate = useNavigate()

  const [isSignUp, setIsSignUp] = useState(true)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  })
  const [validationErrors, setValidationErrors] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  const toggleMode = () => {
    setIsSignUp(!isSignUp)
    setFormValues({
      email: "",
      password: "",
      repeatPassword: "",
    })
    setValidationErrors([])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValidationErrors([])

    const { email, password, repeatPassword } = formValues

    let errors = []

    if (!ValidationService.validateEmail(email)) {
      errors.push(VALIDATION_MESSAGES.INVALID_EMAIL)
    }

    if (!ValidationService.validatePassword(password)) {
      errors.push(VALIDATION_MESSAGES.INVALID_PASSWORD)
    }

    if (
      isSignUp &&
      !ValidationService.validatePasswordMatch(password, repeatPassword)
    ) {
      errors.push(VALIDATION_MESSAGES.PASSWORDS_DO_NOT_MATCH)
    }

    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    try {
      if (isSignUp) {
        dispatch(register({ email, password }))
      } else {
        dispatch(login({ email, password }))
      }
      navigate("/")
    } catch (err) {
      setValidationErrors([
        err.message ||
          (isSignUp
            ? VALIDATION_MESSAGES.REGISTRATION_FAILED
            : VALIDATION_MESSAGES.LOGIN_FAILED),
      ])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-xl">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            name="email"
            value={formValues.email}
            placeholder="Email"
            onChange={handleInputChange}
            type="text"
          />
          <Input
            name="password"
            value={formValues.password}
            placeholder="Password"
            onChange={handleInputChange}
            type="password"
          />
          {isSignUp && (
            <Input
              name="repeatPassword"
              value={formValues.repeatPassword}
              placeholder="Repeat Password"
              onChange={handleInputChange}
              type="password"
            />
          )}
          <div className="flex justify-center">
            <Button name={isSignUp ? "Sign Up" : "Sign In"} />
          </div>
        </form>
        {validationErrors.length > 0 && (
          <div className="mt-4 text-red-500">
            {validationErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        <span
          className="text-sm text-indigo-600 cursor-pointer hover:underline mt-6 block text-center"
          onClick={toggleMode}
        >
          {isSignUp
            ? "Already have an account? Login here"
            : "Don't have an account? Sign up here"}
        </span>
      </div>
    </div>
  )
}
