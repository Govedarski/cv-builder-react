import me from './me.jpg'
import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext.js';
import {StyledCheckInput} from '../helpers/StyledCheckInput/StyledCheckInput.js';
export function Home() {
    const {userData} = useContext(AuthContext)
    return (
        <div>
            <header>
                <img
                    src={userData?.profile["profile_picture_file_url"]}
                    alt="logo"/>
                <p>
                </p>
            </header>
        </div>
    );
}