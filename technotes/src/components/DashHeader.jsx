import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const DASH_REGEX = /^\/dash(\/)?$/
const NOTE_REGEX = /^\/dash\/notes(\/)?$/
const USER_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

  const navigate = useNavigate()

  const { pathname } = useLocation()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate("/")
    }
  }, [isSuccess, navigate])

  if (isLoading) {
    return <p>Loaging out...</p>
  }
  if (isError) return <p>Error: {error.message}</p>

  let dashClass = null

  if (!DASH_REGEX.test(pathname) && !NOTE_REGEX.test(pathname) && !USER_REGEX.test(pathname)) {
    dashClass = "dash-header__container--small"
  }
  const logoutButton = (
    <button
      className="icon-button"
      title="Logout"
      onClick={() => sendLogout()}
    >
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  )

  return (
    <header className="dash-header">
      <div className={`dash-header__container ${dashClass}`}>
        <Link to={"/dash"}>
          <h1 className="dash-header__title">
            techNotes
          </h1>
        </Link>
        <nav className="dash-header__nav">
          {logoutButton}
        </nav>
      </div>
    </header>
  )
}

export default DashHeader