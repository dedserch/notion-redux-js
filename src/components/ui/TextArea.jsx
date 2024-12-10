import React from "react"

export const TextArea = ({ name, value, placeholder, onChange }) => {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md"
    />
  )
}
