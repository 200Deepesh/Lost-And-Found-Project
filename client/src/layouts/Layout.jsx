import { Outlet } from 'react-router'
import ItemsInfo from '../components/ItemsInfo';
import { useItemInfoStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import { useEffect } from 'react';
import { getCookies } from '../api/cookies';
import { useLocation } from 'react-router';
import { useUserStore } from '../store';

const Layout = () => {

    const userId = useUserStore((state) => state.userId)
    const location = useLocation();
    const { itemId, setItemId } = useItemInfoStore(
        useShallow((state) => (
            {
                itemId: state.itemId,
                setItemId: state.setItemId,
            }))
    );


    return (
        <>
            <Outlet />
            {itemId && <ItemsInfo itemId={itemId} deselectItem={() => { setItemId(null); }} isTrusted={location.pathname.split('/').pop() == userId} />}
        </>
    )
}

export default Layout