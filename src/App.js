import './App.css';
import {Home} from './components/Home/Home.js';
import {Route, Routes} from 'react-router-dom';
import {Login} from './components/authentication/Login/Login.js';
import {Navigation} from './components/common/Navigation/Navigation.js';
import {Credits} from './components/common/Credits/Credits.js';
import {LoadingSpinner} from './components/helpers/LoadingSpinner/LoadingSpinner.js';
import {useState} from 'react';
import {AuthProvider} from './context/AuthContext.js';
import {Logout} from './components/authentication/Logout/Logout.js';
import {Register} from './components/authentication/Register/Register.js';
import {RegisterProvider} from './components/authentication/Register/RegisterContext/RegisterContext.js';

export function App() {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <AuthProvider>
            {isLoading && <LoadingSpinner/>}
            <header>
                <Navigation/>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>

                        <Route path="/register" element={<RegisterProvider><Register/></RegisterProvider>}/>

                    <Route path="/login" element={<Login setIsLoading={setIsLoading}/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                </Routes>
            </main>

            <footer>
                <Credits/>
            </footer>
        </AuthProvider>
    );
}

