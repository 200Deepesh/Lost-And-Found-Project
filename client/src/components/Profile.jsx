import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getUserItems } from '../api/items'
import UserItem from './subComponents/UserItem'
import ItemsInfo from './ItemsInfo'
import Navbar from './Navbar'

const Profile = () => {
    const { id } = useParams()
    const [userItems, setUserItems] = useState([])
    const [itemInfo, setItemInfo] = useState(null)
    useEffect(() => {
        console.log(id);
        (
            async () => {
                const itemList = await getUserItems(id)
                setUserItems(itemList.items)
                console.log(userItems)
            }
        )()
    }, [])

    return (
        <>
            <div
                className='h-full w-full overflow-x-auto scrollbar pt-12'>
                    <Navbar theme='light'/>
                <div className='flex flex-col gap-1'>
                    {userItems && userItems.map((item) => {
                        return <UserItem key={item.id} name={item.name} url={item.url} id={item.id} type={item.type} selectItem={ setItemInfo }/>
                    })}
                </div>

                {itemInfo && <ItemsInfo itemInfo={itemInfo} deselectItem={() => { setItemInfo(null) }} isTrusted={true}/>}
            </div>
        </>
    )
}

export default Profile