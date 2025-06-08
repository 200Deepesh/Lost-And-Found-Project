import { Outlet, Navigate } from "react-router"
import { useUserStore } from "../store";
import { useShallow } from "zustand/react/shallow";

const ProtectedRoutes = () => {

    const { userId } = useUserStore(
        useShallow((state) => ({
                userId: state.userId,
            })));

    if (userId === undefined) {
        return (
            <div className="absolute top-0 left-0 z-100 bg-[#00000080] w-dvw h-dvh"></div>
        )
    }

    return (
        userId ? <Outlet /> : <Navigate to={'/signin'} replace={true} />
    )
}

export default ProtectedRoutes