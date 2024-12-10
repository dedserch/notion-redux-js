import React from "react"
import { NavLink } from "react-router-dom"
import { Button } from "../../components/ui/Button"

export const NotFound = () => {
  return (
    <div className="bg-gray-100 text-gray-900 flex-grow flex items-center justify-center min-h-screen p-6">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <h2 className="text-9xl font-bold text-indigo-600">404</h2>
        <h1 className="text-4xl font-semibold text-gray-800">
          Oops! Page not found
        </h1>
        <p className="text-lg text-gray-600">
          We’re sorry, but the page you requested could not be found.
        </p>
        <NavLink to="/">
          <Button name="Back to Home" />
        </NavLink>
      </div>
    </div>
  )
}
