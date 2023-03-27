import './App.css';
import {Home} from './components/Home/Home.js';
import {Route, Routes} from 'react-router-dom';
import {Login} from './components/authentication/Login/Login.js';
import {Navigation} from './components/common/Navigation/Navigation.js';
import {Credits} from './components/common/Credits/Credits.js';
import {AuthProvider} from './context/AuthContext.js';
import {Logout} from './components/authentication/Logout/Logout.js';
import {RegisterProvider} from './components/authentication/Register/RegisterContext/RegisterContext.js';
import {routes} from './constants/routes.js';
import {LoadingProvider} from './context/LoadingContext.js';

export function App() {
    return (
        <LoadingProvider>
            <AuthProvider>
                <header>
                    <Navigation/>
                </header>
                <main>
                    <Routes>
                        <Route path={routes.HOME} element={<Home/>}/>
                        <Route path={routes.REGISTER} element={<RegisterProvider/>}/>
                        <Route path={routes.PROFILE} element={<Home/>}/>
                        <Route path={routes.LOGIN} element={<Login/>}/>
                        <Route path={routes.LOGOUT} element={<Logout/>}/>
                    </Routes>
                </main>

                <footer>
                    <Credits/>
                </footer>
            </AuthProvider>
        </LoadingProvider>
    );
}

