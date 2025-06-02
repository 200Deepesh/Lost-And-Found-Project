import React from 'react'
import { useLoginStore, useUserStore } from '../store'
import { useShallow } from 'zustand/react/shallow'
import { useNavigate } from 'react-router'
import { authUser } from '../api/user'
import { setCookies } from '../api/cookies'

const signin = () => {

  const { emailId, password, setEmailId, setPassword, errors, setErrors, resetAll } = useLoginStore(
    useShallow((state) => (
      {
        emailId: state.emailId,
        password: state.password,
        setEmailId: state.setEmailId,
        setPassword: state.setPassword,
        errors: state.errors,
        setErrors: state.setErrors,
        resetAll: state.resetAll
      }))
  )

  const setUserId = useUserStore((state)=> state.setUserId)

  const navigate = useNavigate()

  const onSubmit = async (formData) => {
    if (!formData.get('emailId')) {
      setErrors({ emailId: { type: 'required', message: 'required' } })
      return
    }
    if (!formData.get('password')) {
      setErrors({ password: { type: 'required', message: 'required' } })
      return
    }

    const data = {
      emailId: formData.get('emailId'),
      password: formData.get('password'),
    }

    // POST REQUEST IN SERVER TO LOGIN ROUTE
    const res = await authUser(data)

    if (!res.error) {
      setCookies(res)
      setUserId(data._id)
      resetAll()
      navigate('/')
    }
    else{
      setErrors(res.error)
    }
  }

  return (
    <div className='font-poppins w-full flex flex-col gap-8'>
      <div className='w-full flex flex-col gap-2'>
        <h1 className='font-medium text-2xl'>Welcome back!</h1>
        <h2 className='font-medium text-sm'>Enter your Credentials to access your account</h2>
      </div>
      <form action={onSubmit} className='flex flex-col w-full gap-4'>
        <div className='flex flex-col w-full relative'>
          <label htmlFor="emailId" className='text-[12px] font-medium'>Email address</label>
          <input type="email" name='emailId' value={emailId} onChange={(e) => { setEmailId(e.target.value) }} placeholder='Enter your email' className='border border-[#D9D9D9] rounded-lg py-1 px-1 text-[10px]   focus-visible:outline-0 focus-visible:border-black placeholder:text-[8px] placeholder:text-[#D9D9D9] ' />
          {errors.emailId && <div className='text-[10px] text-red-500 w-fit absolute right-2 -bottom-4'>{errors.emailId.message}</div>}
        </div>

        <div className='flex flex-col w-full relative'>
          <div className='flex w-full items-center justify-between'>
            <label htmlFor="password" className='text-[12px] font-medium'>Password</label>
            <span className='text-[8px] font-medium text-[#0C2A92]'>forget password</span>
          </div>
          <input type="password" name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter your password' className='border border-[#D9D9D9] rounded-lg py-1 px-1 text-[10px]   focus-visible:outline-0 focus-visible:border-black placeholder:text-[8px] placeholder:text-[#D9D9D9] ' />
          {errors.password && <div className='text-[10px] text-red-500 w-fit absolute right-2 -bottom-4'>{errors.password.message}</div>}

        </div>
        <button type='submit' className='bg-[#5849B0] text-white rounded-full w-full flex items-center justify-center text-xs py-2'>LOG IN</button>
      </form>
    </div>
  )
}

export default signin