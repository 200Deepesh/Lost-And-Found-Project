import { useState, useRef, useEffect } from 'react';
import plusSquareSvg from '/plusSquare.svg';
import CloseBtn from './CloseBtn';

const QuickSearchTags = ({ tags, setItemInfo, edit }) => {
    const [toggleForm, setToggleForm] = useState(false)
    const addTagForm = useRef(null)
    const [tagName, setTagName] = useState('')

    useEffect(() => {
        if (toggleForm) {
            addTagForm.current.scrollIntoView(false);
        }
    }, [toggleForm])

    const handleClick = (e) => {
        e.preventDefault()
        if (tagName) {
            setToggleForm(toggleForm => !toggleForm)
            console.log(!preDefineTags.includes(tagName.toLowerCase()))
            if(!preDefineTags.includes(tagName.toLowerCase())){
                preDefineTags.push(tagName.toLowerCase())
            }
            if(!tags.includes(tagName.toLowerCase())){
                setItemInfo('tags', [...tags, tagName.toLowerCase()])
            }
            setTagName('')
            console.log(tags)
        }
        else {
            console.log('some thing new')
        }
        return 0
    }

    return (
        <>
            <div className='w-full flex gap-1 flex-wrap overflow-auto scroll-mb-1 scrollbar-thin'>
                { edit
                ?tags.map((tag) => <Tags key={tag} tagName={tag.toLowerCase()} tags={tags} setTag={(newTags) => { setItemInfo('tags', newTags) }} />)
                :preDefineTags.map((tag) => <Tags key={tag} tagName={tag.toLowerCase()} tags={tags} setTag={(newTags) => { setItemInfo('tags', newTags) }} />)
                }
                {toggleForm
                    ? <div className='text-xs flex px-2 w-full' ref={el => addTagForm.current = el}>
                        <input
                            type="text"
                            value={tagName}
                            onChange={(e) => { setTagName(e.target.value) }}
                            className='rounded-full border px-2 py-0.5 max-w-32' />
                        <button
                            type='button'
                            className='bg-[#050506CF] rounded-full px-2 py-0.5 text-white text-xs font-poppins cursor-pointer ml-2'
                            onClick={handleClick}>Add</button>
                        <CloseBtn onClick={() => { setToggleForm(false) }} class='' />
                    </div>
                    : (<div className='w-fit px-2 flex items-center'>
                        <img
                            src={plusSquareSvg}
                            alt=""
                            className='w-4 cursor-pointer'
                            onClick={() => {
                                setToggleForm(true);
                            }} />
                    </div>)
                }
            </div>
        </>
    )
}

export default QuickSearchTags

const Tags = ({ tagName, setTag, tags }) => {

    return (
        <div
            onClick={(e) => {
                if (tags.includes(tagName)) setTag(tags.filter((tag) => tag != tagName))
                else setTag([...tags, tagName])
            }}
            className='text-xs py-0.5 px-2 rounded-full box-border border cursor-pointer'
            style={{ borderColor: tags.includes(tagName) ? 'blue' : 'white' }}
        >{tagName[0].toUpperCase() + tagName.slice(1)}</div>
    )
}


const preDefineTags = ['wallet', 'phone', 'watch', 'bottle', 'admin block', 'keys', 'canteen', 'today', 'earbuds', 'books', 'id card']