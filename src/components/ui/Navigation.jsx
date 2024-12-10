import React from "react"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/user/action"


export const Navigation = () => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    await dispatch(logout())
    window.location.href = "/auth"
  }

  return (
    <nav className="flex space-x-6 text-lg">
      <NavLink
        to="/"
        className="hover:text-gray-200 transition-colors duration-200 border-b-2 border-transparent hover:border-gray-200"
      >
        About
      </NavLink>
      <NavLink
        to="/notes"
        className="hover:text-gray-200 transition-colors duration-200 border-b-2 border-transparent hover:border-gray-200"
      >
        Notes
      </NavLink>
      <NavLink
        to="/auth"
        onClick={handleLogout}
        className="hover:text-gray-200 transition-colors duration-200 border-b-2 border-transparent hover:border-gray-200"
      >
        Log out
      </NavLink>
    </nav>
  )
}
