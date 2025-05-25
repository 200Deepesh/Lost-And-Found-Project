import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import FileInputField from './subComponents/FileInputField'
import DateInputField from './subComponents/DateInputField'
import Notfound from './notfound'
import Navbar from './Navbar'
import QuickSearchTags from './subComponents/QuickSearchTags'
import { useNavigate } from 'react-router'
import CloseBtn from './subComponents/CloseBtn'
import { addItem } from '../api/items'
import { useAddItemStore } from '../store'
import { useShallow } from 'zustand/react/shallow'


const AddItem = () => {
  const { type } = useParams()
  const navigate = useNavigate()

  const { inputFile, setInputFile, studentInfo, setStudentInfo, itemInfo, setItemInfo, errors, setErrors, resetAll } = useAddItemStore(
    useShallow((state) => (
      {
        inputFile: state.inputFile,
        setInputFile: state.setInputFile,
        studentInfo: state.studentInfo,
        setStudentInfo: state.setStudentInfo,
        itemInfo: state.itemInfo,
        setItemInfo: state.setItemInfo,
        errors: state.errors,
        setErrors: state.setErrors,
        resetAll: state.resetAll,
      }))
  )

  const handleSubmit = async (formData) => {
    const data = {
      studentInfo: studentInfo,
      itemInfo: itemInfo,
      itemImg: inputFile
    }

    for (const key in studentInfo) {
      if (!studentInfo[key]) {
        setErrors({ studentInfo: { [key]: { type: 'required', message: 'required' } } })
        return
      }
    }
    for (const key in itemInfo) {
      if (!itemInfo[key]) {
        setErrors({ itemInfo: { [key]: { type: 'required', message: 'required' } } })
        console.log(errors)
        return
      }
    }

    //POST REQUEST IN SERVER WITH DATA
    const res = await addItem({ itemInfo, studentInfo })
    if (res.errors) {
      setErrors(res.errors)
      return
    }

    resetAll()
    navigate(-1)
    console.log(data)
  }

  if (type != 'lost' && type != 'found') {
    return <Notfound />
  }


  return (
    <>
      <div className='w-full min-h-fit h-full pt-12 flex items-center justify-center bg-[#5849B0]'>
        <Navbar theme='dark' />
        <form action={handleSubmit} className='w-fit h-fit rounded-xl bg-white p-2 flex flex-col gap-2'>
          <div className='flex justify-between'>
            <div className='text-sm flex items-center justify-center h-6 w-20 rounded-full text-white' style={{ backgroundColor: type == 'lost' ? '#E65D5D' : '#6AC25A' }}>{type.toUpperCase()}</div>
            <CloseBtn onClick={() => { navigate(-1) }} />
          </div>
          <div className='flex gap-4'>
            <div id='left' className='w-fit flex flex-col gap-2'>
              <FileInputField inputFile={inputFile} setInputFile={setInputFile} />
              <div className='flex gap-0.5 flex-col relative'>
                <h2 className='text-sm font-medium'>Contact Detials</h2>
                <div className='w-full border-2 border-[#D9D9D9] box-border rounded-xl p-2 flex flex-col gap-2'>
                  <div className='relative'>
                    <input type="text" name='name' value={studentInfo?.name} onChange={(e) => { setStudentInfo(e.target.name, e.target.value) }} placeholder='Name' className=' w-full max-w-40 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                    {errors?.studentInfo?.name && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.studentInfo?.name.message}</div>}
                  </div>

                  <div className='relative'>
                    <select name='branch' onChange={(e) => { setStudentInfo(e.target.name, e.target.value); console.log(studentInfo) }} className='w-full max-w-40 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black' style={{ color: studentInfo?.branch ? 'black' : '#00000066' }}>
                      <option value="" className=''>Branch</option>
                      <option value='AIDS'>AIDS</option>
                      <option value='CE'>CE</option>
                      <option value='CS'>CS</option>
                      <option value='EE'>EE</option>
                      <option value='MT'>MT</option>
                      <option value='IP'>IP</option>
                      <option value='IT'>IT</option>
                    </select>
                    {errors?.studentInfo?.branch && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.studentInfo?.branch.message}</div>}
                  </div>

                  <div className='relative'>
                    <select name='sem' onChange={(e) => { setStudentInfo(e.target.name, e.target.value); console.log(studentInfo) }} className='w-full max-w-40 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black' style={{ color: studentInfo?.sem ? 'black' : '#00000066' }}>
                      <option value="" className=''>Semester</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                      <option value='7'>7</option>
                      <option value='8'>8</option>
                    </select>
                    {errors?.studentInfo?.sem && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.studentInfo?.sem.message}</div>}
                  </div>

                  <div className='relative'>
                    <input type="text" name='phoneNo' value={studentInfo?.phoneNo} onChange={(e) => { setStudentInfo(e.target.name, e.target.value) }} placeholder='Phone No.' className=' w-full max-w-40 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                    {errors?.studentInfo?.phoneNo && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.studentInfo?.phoneNo.message}</div>}
                  </div>
                  <div className='relative'>
                    <input type="email" name='emailId' value={studentInfo?.emailId} onChange={(e) => { setStudentInfo(e.target.name, e.target.value) }} placeholder='Email ID' className=' w-full max-w-40 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                    {errors?.studentInfo?.emailId && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.studentInfo?.emailId.message}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div id='right' className='flex flex-col gap-2'>
              <div className='flex flex-col gap-2'>
                <div className='relative'>
                  <input type="text" name='name' value={itemInfo?.name} onChange={(e) => { setItemInfo(e.target.name, e.target.value) }} placeholder='Item Name' className='w-56 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                  {errors?.itemInfo?.name && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.itemInfo?.name.message}</div>}
                </div>
                <div className='relative'>
                  <input type="text" name='location' value={itemInfo?.location} onChange={(e) => { setItemInfo(e.target.name, e.target.value) }} placeholder='Location' className='w-56 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                  {errors?.itemInfo?.location && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.itemInfo?.location.message}</div>}
                </div>
                <div className='relative'>
                  <input type="date" name='date' value={itemInfo?.date} onChange={(e) => { setItemInfo(e.target.name, e.target.value) }} placeholder='Location' className='w-56 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                  {errors?.itemInfo?.date && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.itemInfo?.date.message}</div>}
                </div>
              </div>
              <div className='flex gap-0.5 flex-col relative'>
                <label htmlFor="discription" className='text-sm font-medium'>Discription</label>
                <textarea name="discription" id="" value={itemInfo?.discription} onChange={(e) => { setItemInfo(e.target.name, e.target.value) }} placeholder='Discription the item...' className='w-84 h-48 border-2 box-border border-[#D9D9D9] rounded-xl p-2 text-xs resize-none focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] overflow-auto'></textarea>
                {errors?.itemInfo?.discription && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.itemInfo?.discription.message}</div>}
              </div>
              <div className='border-2 box-border border-[#D9D9D9] p-2 w-84 rounded-xl gap-1 flex flex-col'>
                <div className='text-[#00000066] text-sm relative'>Tags for Quick Search</div>
                <div className='w-full flex gap-1 flex-wrap'>
                  {preDefineTags.map((tag) => <QuickSearchTags key={tag} tagName={tag} tags={itemInfo?.quickSearchTags} setTag={(newTags) => { setItemInfo('quickSearchTags', newTags) }} />)}
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center gap-4'>
            <button className='bg-[#050506CF] rounded-full px-4 py-1 text-white text-xs font-poppins'>Save</button>
            <button className='bg-[#050506CF] rounded-full px-4 py-1 text-white text-xs font-poppins' onClick={() => { navigate(-1) }}>Cancle</button>
          </div>
        </form >
      </div>
    </>
  )
}

export default AddItem

const preDefineTags = ['Wallet', 'Phone', 'Watch', 'Bottle', 'Admin Block', 'Keys', 'Canteen', 'Today', 'EarBuds']