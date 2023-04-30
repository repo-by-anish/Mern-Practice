import { useSelector } from "react-redux"
import usePersist from "../../hooks/usePersist"
import { selectCurrentToken } from "./authSlice"
import { useEffect, useRef, useState } from "react"
import PulseLoader from "react-spinners/PulseLoader";
import { useRefreshMutation } from "../auth/authApiSlice"
import { Link, Outlet } from "react-router-dom"


const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false);

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== "development") {
            const verifyRefreshToken = async () => {
                console.log("verifying refresh token")

                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (error) {
                    console.error(error);
                }
            }
            if (!token && persist) verifyRefreshToken()
        }
        
        return () => effectRan.current = true
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    let content;

    if (!persist) {
        console.log("No persist")
        content = <Outlet />
    } else if (isLoading) {
        console.log("Loading")
        content = <PulseLoader color={"FFF"}/>
    } else if (isError) {
        console.log("Error");
        content = (
            <p className="errmsg">
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>
            </p>
        )
    } else if (isSuccess && trueSuccess) {
        console.log("success")
        content = <Outlet />
    } else if (token && isUninitialized) {
        console.log("token and  uninit")
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin