import React from 'react'


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input({
    label,
    type = 'text',
    className = 'px-4 py-3 border border-[#c2c2c2]  rounded w-full',
    ...props

}, ref) 
{
    const id = React.useId();
  return (
    <div>
        {label && <label htmlFor={id} className='text-[#333333] '> {label}</label>}
        <input
        type={type}
        className={`${className} `}
        ref={ref}
        {...props}
        id={id}
        ></input>
    </div>
  )
})

export default Input;