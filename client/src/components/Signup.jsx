import React from 'react'
import { useSignupStore } from '../store'
import { useShallow } from 'zustand/react/shallow'

const Signup = () => {

  const { emailId, password, setEmailId, setPassword, errors, setErrors, name, setName, checkbox, setCheckbox } = useSignupStore(
    useShallow((state) => (
      {
        emailId: state.emailId,
        password: state.password,
        setEmailId: state.setEmailId,
        setPassword: state.setPassword,
        errors: state.errors,
        setErrors: state.setErrors,
        name: state.name,
        setName: state.setName,
        checkbox: state.checkbox,
        setCheckbox: state.setCheckbox
      }))
  )

  const onSubmit = (formData) => {
    if (!formData.get('name')) {
      setErrors({ name: { type: 'required', message: 'required' } })
      return
    }
    if (!formData.get('emailId')) {
      setErrors({ emailId: { type: 'required', message: 'required' } })
      return
    }
    if (!formData.get('password')) {
      setErrors({ password: { type: 'required', message: 'required' } })
      return
    }
    if (!formData.get('checkbox')) {
      setErrors({ checkbox: { type: 'required', message: 'required' } })
      return
    }

    const data = {
      emailId: formData.get('emailId'),
      password: formData.get('password'),
      name: formData.get('name'),
      checkbox: formData.get('checkbox'),
    }
    // POST REQUEST IN SERVER TO SIGNUP ROUTE

    console.log(data)
  }

  return (
    <div className='font-poppins w-full flex flex-col gap-8'>
      <div className='w-full flex flex-col gap-2'>
        <h1 className='font-medium text-2xl'>Get Started Now</h1>
      </div>
      <form action={onSubmit} className='flex flex-col w-full gap-4'>
        <div className='flex flex-col w-full relative'>
          <label htmlFor="name" className='text-[12px] font-medium'>Name</label>
          <input type="text" name='name' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter your name' className='border border-[#D9D9D9] rounded-lg py-1 px-1 text-[10px]   focus-visible:outline-0 focus-visible:border-black placeholder:text-[8px] placeholder:text-[#D9D9D9] ' />
          {errors.name && <div className='text-[10px] text-red-500 w-fit absolute right-2 -bottom-4'>{errors.name.message}</div>}
        </div>

        <div className='flex flex-col w-full relative'>
          <label htmlFor="emailId" className='text-[12px] font-medium'>Email address</label>
          <input type="email" name='emailId' value={emailId} onChange={(e) => { setEmailId(e.target.value) }} placeholder='Enter your email' className='border border-[#D9D9D9] rounded-lg py-1 px-1 text-[10px]   focus-visible:outline-0 focus-visible:border-black placeholder:text-[8px] placeholder:text-[#D9D9D9] ' />
          {errors.emailId && <div className='text-[10px] text-red-500 w-fit absolute right-2 -bottom-4'>{errors.emailId.message}</div>}
        </div>

        <div className='flex flex-col w-full relative'>
          <div className='flex w-full items-center justify-between'>
            <label htmlFor="password" className='text-[12px] font-medium'>Password</label>
          </div>
          <input type="password" name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter your password' className='border border-[#D9D9D9] rounded-lg py-1 px-1 text-[10px]   focus-visible:outline-0 focus-visible:border-black placeholder:text-[8px] placeholder:text-[#D9D9D9] ' />
          {errors.password && <div className='text-[10px] text-red-500 w-fit absolute right-2 -bottom-4'>{errors.password.message}</div>}
        </div>

        <div className='flex gap-2 relative'>
          <input type="checkbox" name='checkbox' value={checkbox} onChange={(e) => { setCheckbox(e.target.checked) }} className='w-2.5 h-2.5' />
          <label htmlFor="checkbox" className='text-[8px] font-medium'>I agree to the terms & policy</label>

          {errors.checkbox && <div className='text-[10px] text-red-500 w-fit absolute right-2'>{errors.checkbox.message}</div>}
        </div>
        <button type='submit' className='bg-[#5849B0] text-white rounded-full w-full flex items-center justify-center text-xs py-2'>SIGN UP</button>
      </form>
    </div>
  )
}

export default Signup