import React from "react"

export const Button = ({ name, onClick }) => {
  return (
    <button
      className="inline-block px-8 py-3 text-indigo-700 bg-indigo-100 rounded-md shadow-md hover:bg-indigo-200 hover:text-indigo-900 transition-all duration-200"
      onClick={onClick}
    >
      {name}
    </button>
  )
}
