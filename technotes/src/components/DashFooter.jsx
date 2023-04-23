import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom"
const DashFooter = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

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
            <p>Current User</p>
            <p>Status</p>
        </footer>
    )

    return content
}

export default DashFooter