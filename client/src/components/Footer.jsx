import React from 'react'
import logo from '/logo.png'
import facebookLogo from '/Facebook.svg'
import twitterLogo from '/Twitter.svg'
import instagramLogo from '/Instagram.svg'

const Footer = () => {
  return (
    <>
      <footer
        className='w-full bg-[#594AB1] flex items-center justify-center text-xl'>
        <div
          className='lg:w-4/5 min-[60rem]:w-11/12 w-full flex-col text-white px-4 py-2 font-jakarta gap-4 flex'>
          <div
            className='flex justify-between max-sm:w-96 max-sm:self-center sm:flex-row flex-col'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-col'>
                <img src={logo} alt="" className='w-8 h-8' />
                <span className='font-mrounded font-bold text-2xl'>Findoro</span>
              </div>
              <div className='text-[10px] wrap-break-word w-46 font-light'>Our vision is to provide convenience and help increase your sales business.</div>
              <div className='flex gap-4'>
                <div className='w-5 overflow-hidden flex justify-center'>
                  <img src={facebookLogo} alt="" className='w-10 max-w-none' />
                </div>
                <div className='w-5 overflow-hidden flex justify-center'>
                  <img src={twitterLogo} alt="" className='w-10 max-w-none' />
                </div>
                <div className='w-5 overflow-hidden flex justify-center'>
                  <img src={instagramLogo} alt="" className='w-10 max-w-none' />
                </div>
              </div>
            </div>
            <div className='flex md:gap-16 gap-8'>
              <div className='flex flex-col gap-6 w-28'>
                <span className='flex h-8 items-center text-[16px] font-medium'>About</span>
                <ul className='flex flex-col gap-4 text-xs'>
                  <li>How it works</li>
                  <li>Featured</li>
                  <li>Partnership</li>
                  <li>Bussiness Relation</li>
                </ul>
              </div>
              <div className='flex flex-col gap-6 w-28'>
                <span className='flex h-8 items-center text-[16px] font-medium'>Community</span>
                <ul className='flex flex-col gap-4 text-xs'>
                  <li>Campaign</li>
                  <li>Invite a friend</li>
                </ul>
              </div>
              <div className='flex flex-col gap-6 sm:w-28'>
                <span className='flex h-8 items-center text-[16px] font-medium'>Socials</span>
                <ul className='flex flex-col gap-4 text-xs'>
                  <li>Discord</li>
                  <li>Instagram</li>
                  <li>Twitter</li>
                  <li>Facebook</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='w-4/5 h-[2px] bg-white rounded-full self-center'></div>
          <div className='flex text-[10px] w-full flex-col items-center gap-2 min-[28rem]:justify-between min-[28rem]:flex-row py-2'>
            <div className=''>©2025  Findoro. All rights reserved</div>
            <div className='flex gap-8'>
              <div>Privacy & Policy</div>
              <div>Terms & Condition</div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer