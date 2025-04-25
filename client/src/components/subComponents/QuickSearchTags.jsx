import { set } from 'mongoose'
import React from 'react'

const QuickSearchTags = ({ tagName, setTag, tags }) => {
    return (
        <div
            onClick={(e) => {
                if (tags.includes(tagName)) setTag(tags.filter((tag) => tag != tagName))
                else setTag([...tags, tagName])
            }}
            className='text-xs py-0.5 px-2 rounded-full box-border border cursor-pointer'
            style={{ borderColor: tags.includes(tagName) ? 'blue' : 'white' }}
        >{tagName}</div>
    )
}

export default QuickSearchTags