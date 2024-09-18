import React from 'react'

export const FormInput = ({label, type,name, value, onChange, required}) => {
  console.log(value)
  return (
    <div className="space-y-1">
        <label className="block text-sm font-medium text-left">{label}</label>
        <input
            type={type}
            name = {name}
            value={value}
            onChange={onChange}
            required={required}
            className="border rounded w-full px-3 py-2"
        />
    </div>
  )
}
