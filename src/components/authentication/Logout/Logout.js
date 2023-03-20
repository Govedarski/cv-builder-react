import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../../context/AuthContext.js';


export function Logout() {
    const navigate = useNavigate();
    const {userLogout} = useContext(AuthContext);

    userLogout();
    navigate('/');

    return null;
}
