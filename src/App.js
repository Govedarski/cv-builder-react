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
import {CVList} from './components/data/cv/CVList/CVList.js';
import {CVDetails} from "./components/data/cv/CVDetails/CVDetails";
import {WorkExpList} from "./components/data/workExp/WorkExpList/WorkExpList";
import {WorkExpDetails} from "./components/data/workExp/WorkExpDetails/WorkExpDetails";
import {WorkExpCreateEdit} from "./components/data/workExp/WorkExpCreateEdit/WorkExpCreateEdit";

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
                        <Route path={routes.PROFILE_OWN} element={<Profile/>}/>
                        <Route path={routes.LOGIN} element={<Login/>}/>
                        <Route path={routes.LOGOUT} element={<Logout/>}/>

                        <Route path={routes.CV_LIST} element={<CVList/>}/>
                        <Route path={routes.CV_DETAILS} element={<CVDetails/>}/>
                        <Route path={routes.WORK_EXP} element={<WorkExpList/>}/>
                        <Route path={routes.WORK_EXP_CREATE} element={<WorkExpCreateEdit/>}/>
                        <Route path={routes.WORK_EXP_EDIT} element={<WorkExpCreateEdit isEdit={true}/>}/>
                        <Route path={routes.WORK_EXP_DETAILS} element={<WorkExpDetails/>}/>
                    </Routes>
                </main>

                <footer>
                    <Credits/>
                </footer>
            </UserProvider>
        </LoadingProvider>
    );
}

