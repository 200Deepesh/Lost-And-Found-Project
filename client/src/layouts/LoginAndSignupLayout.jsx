import { Outlet, Link, useNavigate } from 'react-router';
import arrowPng from '/Arrow-left-circle.png';
import backgroundImg from '/background.png';
import googleLogo from '/google-logo.png';
import appleLogo from '/apple-logo.png';

const LoginAndSignupLayout = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className='w-full h-full flex'>
        <div className='h-full flex justify-center items-center flex-1'>
          <img onClick={()=>{ navigate(-1)}} src={arrowPng} alt="" className='w-8 h-8 absolute top-2 left-2 z-10' />
          <div className='flex justify-center items-center flex-col gap-8'>
            <Outlet />
            <div className='font-poppins items-center justify-center flex flex-col gap-8'>
              <div className='flex items-center justify-between px-2 w-full'>
                <div className='w-5/12 h-[1px] bg-[#ededed] rounded-full'></div>
                <div className='text-[8px] font-medium'>Or</div>
                <div className='w-5/12 h-[1px] bg-[#ededed] rounded-full'></div>
              </div>
              <div className='w-full flex flex-col justify-center items-center gap-4'>
                <div className='w-full flex gap-6'>
                  <button className='flex border border-[#d9d9d9] rounded-md items-center gap-2 py-1 px-3'>
                    <img src={googleLogo} alt="" className='h-4 w-4' />
                    <span className='text-[10px] font-poppins font-medium'>Sign in with Google</span>
                  </button>
                  <button className='flex border border-[#D9D9D9] rounded-md items-center gap-2 py-1 px-3'>
                    <img src={appleLogo} alt="" className='h-4 w-4' />
                    <span className='text-[10px] font-poppins font-medium'>Sign in with Apple</span>
                  </button>
                </div>
                <div className='font-poppins text-xs font-medium w-fit'>
                  {(window.location.pathname == '/signup') ? <>Have an account?  <Link to={'/signin'} className='text-[#0F3DDE]'>Sign In</Link></> : <>Don't have an account?  <Link to={'/signup'} className='text-[#0F3DDE]'>Sign Up</Link></>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='h-full md:w-1/2 w-2/5 relative bg-[#5849B0] overflow-hidden rounded-l-3xl min-[36rem]:flex hidden'>
          <img src={backgroundImg} alt="" className='h-full w-full blur-md absolute opacity-30 top-0 left-0' />
        </div>
      </div>
    </>
  )
}

export default LoginAndSignupLayout