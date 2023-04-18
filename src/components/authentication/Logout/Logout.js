import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../../../context/UserContext.js';
import {routes} from "../../../constants/routes";


export function Logout() {
    const {userLogout} = useContext(UserContext);

    function handleLogout(userLogout) {
        userLogout();
    }

    return (
        <Link to={routes.HOME} onClick={() => handleLogout(userLogout)}>
            Logout
        </Link>
    );
}
