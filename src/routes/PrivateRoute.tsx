import { Navigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'


// примеры public - login and register
// примеры private - профиль и т.д

interface Props {
    component: React.ComponentType
    path?: string
    auth: boolean
    type: "private" | "public"
}

export const PrivateRoute: React.FC<Props> = ({ component: RouteComponent, auth, type }) => {

    if (auth && type === "private") {
        return <RouteComponent />
    }

    if (auth && type === "public") {
        return <Navigate to="/" />
    }

    if (!auth && type === "public") {
        return <RouteComponent />
    }

    return <Navigate to="/login" />
}