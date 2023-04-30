import { Navigate, Outlet, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
// protecting routes
const RequireAuth = ({allowedRoles}) => {
    const {roles}= useAuth()
    const location= useLocation()
    const content= (
        roles.some(role=>allowedRoles.includes(role))?
        <Outlet/>
        : <Navigate to="/login" state={{from: location}} replace/>
    )
    return content;
}

export default RequireAuth