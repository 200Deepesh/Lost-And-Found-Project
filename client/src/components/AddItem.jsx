import React from 'react'
import { useParams } from 'react-router'

const AddItem = () => {

    const { type } = useParams()
  return (
    <>
    <div>AddItem</div>
    <div>{type}</div>
    </>
  )
}

export default AddItem