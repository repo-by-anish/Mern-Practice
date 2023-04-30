import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../hooks/useAuth";
const DashFooter = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {username, status}=useAuth()

    const onGoHomeClick = () => navigate("/dash");

    let homeButton = null;

    if (pathname !== "/dash") {
        homeButton = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClick}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        )
    }

    const content = (
        <footer className="dash-footer">
            {homeButton}
            <p>Current User: {username}</p>
            <p>Status: {status}</p>
        </footer>
    )

    return content
}

export default DashFooter