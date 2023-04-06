import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserContext} from '../../../context/UserContext.js';


export function Logout() {
    const navigate = useNavigate();
    const {userLogout} = useContext(UserContext);

    userLogout();
    navigate('/');

    return null;
}
