import me from './me.jpg'
import {useContext} from 'react';
import {UserContext} from '../../context/UserContext.js';
import {StyledCheckInput} from '../helpers/custom_inputs/StyledCheckInput/StyledCheckInput.js';
export function Home() {
    const {userData} = useContext(UserContext)
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