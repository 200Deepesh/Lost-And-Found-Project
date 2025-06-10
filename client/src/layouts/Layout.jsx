import { Outlet, useLocation } from 'react-router';
import ItemsInfo from '../pages/ItemsInfo';
import { useItemInfoStore, useUserStore } from '../store';
import { useShallow } from 'zustand/react/shallow';

const Layout = () => {

    const { setUserId, userId } = useUserStore(
        useShallow((state) => (
            {
                setUserId: state.setUserId,
                userId: state.userId,
            })));
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