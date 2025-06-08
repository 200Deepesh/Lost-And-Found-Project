import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import FileInputField from './subComponents/FileInputField';
import Notfound from './notfound';
import Navbar from './Navbar';
import QuickSearchTags from './subComponents/QuickSearchTags';
import CloseBtn from './subComponents/CloseBtn';
import { addItem, getItemByID, updateItemByID } from '../api/items';
import { useAddItemStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import DropdownInputField from './subComponents/DropdownInputField';


const AddItem = () => {
  const { initialStatus } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null);

  const { inputFile, setInputFile, studentInfo, setStudentInfo, itemInfo, setItemInfo, errors, setErrors, resetAll, setAll } = useAddItemStore(
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
        setAll: state.setAll,
      }))
  )

  useEffect(() => {

    (async () => {
      console.log('use effect is working fine');
      const url = window.location.search
      const quary = new URLSearchParams(url)
      const id = quary.get('id')
      const edit = quary.get('edit')

      if (id && edit == 'true') {
        const item = await getItemByID(id)
        if (item) {
          setAll(item)
          setItem(item)
        }
      }
    })()

    return () => {
      console.log(itemInfo, studentInfo, item)
    }
  }, [])


  const handleSubmit = async () => {
    console.log('form is submited')
    console.log(item)
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
    if (item?._id) {
      const res = await updateItemByID(item._id, { itemInfo, studentInfo, inputFile, initialStatus })
      if (res.errors) {
        setErrors(res.errors)
        return
      }
    }
    else {
      const res = await addItem({ itemInfo, studentInfo, initialStatus, inputFile })
      if (res.errors) {
        setErrors(res.errors)
        return
      }
    }

    resetAll()
    navigate(-1)
  }

  if (initialStatus != 'lost' && initialStatus != 'found') {
    return <Notfound />
  }


  return (
    <>
      <div className='w-full min-h-fit h-full pt-12 flex items-center justify-center bg-[#5849B0]'>
        <Navbar theme='dark' />
        <form action={handleSubmit} className='w-fit h-fit rounded-xl bg-white p-2 flex flex-col gap-2'>
          <div className='flex justify-between'>
            <div className='text-sm flex items-center justify-center h-6 w-20 rounded-full text-white' style={{ backgroundColor: initialStatus == 'lost' ? '#E65D5D' : '#6AC25A' }}>{initialStatus.toUpperCase()}</div>
            <CloseBtn onClick={() => { navigate(-1) }} />
          </div>
          <div id='form' className='w-full grid grid-cols-1 gap-y-2'>
            <FileInputField id='img-file' inputFile={inputFile} setInputFile={setInputFile} url={item?.url} />
            <div id='item-info' className='flex flex-col gap-2'>
              <div className='relative'>
                <input type="text" name='name' value={itemInfo?.name} onChange={(e) => { setItemInfo(e.target.name, e.target.value) }} placeholder='Item Name' className='w-56 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                {errors?.itemInfo?.name && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.itemInfo?.name.message}</div>}
              </div>
              <div className='relative'>
                <input type="text" name='location' value={itemInfo?.location} onChange={(e) => { setItemInfo(e.target.name, e.target.value) }} placeholder='Location' className='w-56 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                {errors?.itemInfo?.location && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.itemInfo?.location.message}</div>}
              </div>
              <div className='relative'>
                <input type="date" name='date' value={itemInfo?.date} onChange={(e) => { setItemInfo(e.target.name, e.target.value); console.log(e.target.value) }} placeholder='Location' className='w-56 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                {errors?.itemInfo?.date && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.itemInfo?.date.message}</div>}
              </div>
            </div>
            <div id='contact-details' className='flex gap-0.5 flex-col relative w-64'>
              <h2 className='text-sm font-medium'>Contact Detials</h2>
              <div className='w-full border-2 border-[#D9D9D9] box-border rounded-xl p-2 flex flex-col gap-1'>
                <div className='relative'>
                  <input type="text" name='name' value={studentInfo?.name} onChange={(e) => { setStudentInfo(e.target.name, e.target.value) }} placeholder='Name' className=' w-full max-w-40 border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]  focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] ' />
                  {errors?.studentInfo?.name && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.studentInfo?.name.message}</div>}
                </div>

                <div className='relative'>
                  <DropdownInputField
                    placeholder={'Branch'}
                    value={studentInfo?.branch}
                    setValue={(value) => { setStudentInfo('branch', value) }}
                    options={["AIDS", "CE", "CS", "EE", "MT", "IP", "IT"]} />
                  {errors?.studentInfo?.sem && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.studentInfo?.sem.message}</div>}
                </div>

                <div className='relative'>
                  <DropdownInputField
                    placeholder={'Semester'}
                    value={studentInfo?.sem}
                    setValue={(value) => { setStudentInfo('sem', value) }}
                    options={["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]} />
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

            <div id='discription' className='flex gap-0.5 flex-col relative'>
              <label htmlFor="discription" className='text-sm font-medium'>Discription</label>
              <textarea name="discription" id="" value={itemInfo?.discription} onChange={(e) => { setItemInfo(e.target.name, e.target.value) }} placeholder='Discription the item...' className='w-64 h-48 border-2 box-border border-[#D9D9D9] rounded-xl p-2 text-xs resize-none focus-visible:outline-0 focus-visible:border-black placeholder:text-[12px] placeholder:text-[#00000066] overflow-auto'></textarea>
              {errors?.itemInfo?.discription && <div className='text-[10px] text-red-500 w-fit absolute right-1 top-1.5'>{errors?.itemInfo?.discription.message}</div>}
            </div>
            <div id='tags' className='border-2 box-border border-[#D9D9D9] p-1 rounded-xl w-64 max-w-96 gap-1 flex flex-col max-h-24'>
              <div className='text-[#00000066] text-sm relative'>Tags for Quick Search</div>
              <QuickSearchTags tags={itemInfo?.tags} setItemInfo={setItemInfo} />
            </div>
          </div>
          <div className='flex items-center justify-center gap-4'>
            <button
              className='bg-[#050506CF] rounded-full px-4 py-1 text-white text-xs font-poppins cursor-pointer'
              type='submit'>
              {item ? 'Update' : 'save'}
            </button>
            < button
              type='button'
              className='bg-[#050506CF] rounded-full px-4 py-1 text-white text-xs font-poppins cursor-pointer'
              onClick={() => {
                navigate(-1);
                resetAll();
                return 0;
              }}>
              Cancle
            </button>
          </div>
        </form >
      </div >
    </>
  )
}

export default AddItem
