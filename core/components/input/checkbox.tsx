import classNames from "classnames"
import React from "react"

export interface CheckboxInputProps {
  checked: boolean
  onClick?: (value: any) => void
  onChange?: (value: any) => void
  checkValue: string
  name: string
  disabled?: boolean
  icon?: string
}

export const CheckboxInput = ({
  checked,
  onClick,
  checkValue,
  name,
  onChange,
  disabled,
  icon = "text-xs text-white fas fa-check",
}: CheckboxInputProps) => {
  //---------------------
  // RENDER
  //--------------------
  return (
    <>
      <input
        data-cy={`core-check-box-primary-${checkValue}`}
        type="checkbox"
        className="hidden"
        id={`checkbox-input-${name}`}
        name={name}
        value={checkValue}
        checked={checked}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
      />
      <label
        htmlFor={`checkbox-input-${name}`}
        className={classNames("flex cursor-pointer items-center justify-center h-[28px] w-[28px] rounded-[8px] shrink-0", {
          border: !checked,
          "border border-brown-10 bg-brown-10 ": checked && !disabled,
          "bg-gray-10 border": disabled,
        })}
      >
        {checked && <i className={`text-center text-[14px] w-[14px] h-[14px] ${icon} ${disabled ? 'text-gray-50' : 'text-white'}`}></i>}
      </label>
    </>
  )
}
