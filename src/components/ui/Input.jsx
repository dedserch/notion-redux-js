import React from "react"

export const Input = ({ name, value, placeholder, onChange, type }) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full px-4 py-2 border-gray-300 border"
    />
  )
}
