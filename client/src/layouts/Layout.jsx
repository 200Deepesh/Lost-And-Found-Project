import { Outlet } from 'react-router'
import ItemsInfo from '../components/ItemsInfo';
import { useItemInfoStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { getCookies } from '../api/cookies';

const Layout = () => {

    const { itemId, setItemId } = useItemInfoStore(
        useShallow((state) => (
            {
                itemId: state.itemId,
                setItemId: state.setItemId,
            }))
    );

    useEffect(() => {
      console.log(getCookies('_id'));
      console.log()
    }, )
    

    return (
        <>
            <Outlet />
            {itemId && <ItemsInfo itemId={itemId} deselectItem={() => { setItemId(null); }} />}
        </>
    )
}

export default Layout