import {useContext} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {UserContext} from '../../../context/UserContext.js';
import {routes} from "../../../constants/routes";


export function Logout() {
    const {userLogout} = useContext(UserContext);
    const location = useLocation();

    function handleLogout(userLogout) {
        userLogout();
        if (location.pathname === routes.HOME) {
            window.location.reload();
        }
    }

    return (
        <Link to={routes.HOME} onClick={() => handleLogout(userLogout)}>
            Logout
        </Link>
    );
}
