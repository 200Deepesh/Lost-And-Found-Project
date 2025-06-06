import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getUserItems } from '../api/items';
import UserItem from './subComponents/UserItem';
import Navbar from './Navbar';
import { useItemInfoStore } from '../store';
import { useShallow } from 'zustand/react/shallow';

const Dashboard = () => {
    const { id } = useParams()
    const [userItems, setUserItems] = useState([])
    const { itemId, setItemId } = useItemInfoStore(
        useShallow((state) => (
            {
                itemId: state.itemId,
                setItemId: state.setItemId,
            }))
    );

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
                className='h-full w-full overflow-x-auto pt-12 flex scrollbar-thin'>
                <Navbar theme='light' />
                <div className='flex flex-col gap-1 items-center flex-1 overflow-y-auto px-2'>
                    {userItems && userItems.map((item) => {
                        console.log(item.id)
                        return <UserItem key={item.id} name={item.name} url={item.url} id={item.id} initialStatus={item.initialStatus} selectItem={() => { setItemId(item.id) }} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Dashboard