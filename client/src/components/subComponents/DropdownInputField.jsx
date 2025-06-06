import { useState } from 'react';
import downArrow from '/downArrow.svg';

const DropdownInputField = ({ placeholder, value, options, setValue }) => {
    const [displayOptions, setDisplayOptions] = useState(false)

    return (
        <>
            <div
                onClick={(e) => { setDisplayOptions(displayOptions => !displayOptions) }}
                className='relative w-full max-w-40 h-fit flex flex-col'>
                <div
                    className='w-full border border-[#D9D9D9] rounded-full py-1 px-2 text-[12px]'
                    style={{ borderColor: (displayOptions) ? 'black' : '#D9D9D9', color: value ? 'black' : '#00000066' }}>
                    {value ? value : placeholder}
                </div>
                <img src={downArrow} alt="" className='w-4 absolute right-1 top-2' />


                {displayOptions && (<>
                    <div
                        className='absolute w-11/12 self-center bottom-full bg-white rounded-lg z-10 border border-gray-400 text-[12px] overflow-hidden'>
                        {options?.map((option) => {
                            return (<div
                                className='py-[3px] px-2 hover:bg-blue-700 hover:text-white'
                                style={(value == option) ? { backgroundColor: '#7171e7', color: 'white' } : {}}
                                onClick={(e) => { setValue(option) }}
                                key={option}>
                                {option}
                            </div>)
                        })}
                    </div>
                    <div className='w-dvw h-dvh bg-transparent z-5 fixed top-0 left-0'>
                    </div>
                </>
                )}
            </div>
        </>
    )
}

export default DropdownInputField