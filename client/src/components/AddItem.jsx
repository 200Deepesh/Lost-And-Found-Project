import React, { useState } from 'react'
import { useParams } from 'react-router'
import FileInputField from './subComponents/FileInputField'
import DateInputField from './subComponents/DateInputField'
import Notfound from './notfound'

const AddItem = () => {
  const { type } = useParams()

  const [studentInfo, setStudentInfo] = useState({
    name: '',
    branch: '',
    sem: '',
    phoneNo: '',
    emailId: '',
  })
  const [itemInfo, setItemInfo] = useState({
    name: '',
    location: '',
    date: '',
    quickSearchTags: [],
  })
  const [errors, setErrors] = useState({})

  if (type != 'lost' && type != 'found') {
    return <Notfound />
  }


  return (
    <>
      <div>AddItem</div>
      <form action="">
        <div className='text-sm flex items-center justify-center h-6 w-20 rounded-full text-white' style={{ backgroundColor: type == 'lost' ? '#E65D5D' : '#6AC25A' }}>{type.toUpperCase()}</div>
        <div>
          <div id='left'>
            <FileInputField />
            <div>
              <input type="text" name='name' value={studentInfo.name} onChange={(e) => { setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value }) }} placeholder='Enter your name' className='border border-[#D9D9D9] rounded-lg py-1 px-1 text-[10px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[8px] placeholder:text-[#D9D9D9] ' />
              {errors?.studentInfo?.name && <div className='text-[10px] text-red-500 w-fit absolute right-2 -bottom-4'>{errors?.name.message}</div>}
            </div>
          </div>
          <div id='right'></div>
        </div>

      </form>
    </>
  )
}

export default AddItem