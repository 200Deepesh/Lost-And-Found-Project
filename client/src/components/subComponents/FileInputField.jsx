import React from 'react'
import { useRef, useState, useEffect } from 'react'
import addCircleSvg from '/add-circle.svg'

const FileInputField = ({inputFile, setInputFile, id}) => {

    const inputField = useRef(null)
    const handleInputFieldClick = () => {
        console.log(inputField.current)
        inputField.current.click()
    }
    const handleInputFieldChange = (e) => {
        if( e.target.files && e.target.files[0] ){
            const file = e.target.files[0]
            setInputFile(file)
        }
        console.log(e)
    }
    const handleDragOver = (e)=>{
        e.preventDefault()
        console.log(e)
    }
    const handleDrop = (e)=>{
        e.preventDefault()
        if( e.dataTransfer?.files && e.dataTransfer?.files[0]){
            const file = e.dataTransfer.files[0]
            setInputFile(file)
        }
        console.log(e)
    }

    return (
        <>
            <div
                id={id? id: 'file-input'}
                onClick={handleInputFieldClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className='w-64 h-48 rounded-2xl overflow-hidden bg-[#e3e3e3] cursor-pointer'
            >
                {
                    inputFile
                        ? <img src={URL.createObjectURL(inputFile)} alt='Input File' className='w-full h-full'/>
                        : (<div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                            <img src={addCircleSvg} alt="" className='w-12'/>
                            <span className='text-2xl font-bold font-mrounded text-[#b2b2b2]'>Add Image</span>
                        </div>)
                }
            </div>
            <input
                type="file"
                ref={inputField}
                onChange={handleInputFieldChange}
                style={{ display: 'none' }}
                name='itemImg'
            />
        </>
    )
}

export default FileInputField