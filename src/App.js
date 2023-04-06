import './App.css';
import {Home} from './components/Home/Home.js';
import {Route, Routes} from 'react-router-dom';
import {Login} from './components/authentication/Login/Login.js';
import {Navigation} from './components/common/Navigation/Navigation.js';
import {Credits} from './components/common/Credits/Credits.js';
import {UserProvider} from './context/UserContext.js';
import {Logout} from './components/authentication/Logout/Logout.js';
import {RegisterProvider} from './components/authentication/Register/RegisterContext/RegisterContext.js';
import {routes} from './constants/routes.js';
import {LoadingProvider} from './context/LoadingContext.js';
import {Profile} from './components/Profile/Profile.js';

export function App() {
    return (
        <LoadingProvider>
            <UserProvider>
                <header>
                    <Navigation/>
                </header>
                <main>
                    <Routes>
                        <Route path={routes.HOME} element={<Home/>}/>
                        <Route path={routes.REGISTER} element={<RegisterProvider/>}/>
                        <Route path={routes.OWN_PROFILE} element={<Profile/>}/>
                        <Route path={routes.LOGIN} element={<Login/>}/>
                        <Route path={routes.LOGOUT} element={<Logout/>}/>
                    </Routes>
                </main>

                <footer>
                    <Credits/>
                </footer>
            </UserProvider>
        </LoadingProvider>
    );
}

