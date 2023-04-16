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
import {EducationList} from "./components/data/education/EducationList/EducationList";
import {EducationDetails} from "./components/data/education/EducationDetails/EducationDetails";
import {EducationCreateEdit} from "./components/data/education/EducationCreateEdit/EducationCreateEdit";
import {ReferencesList} from "./components/data/references/ReferencesList/ReferencesList";
import {ReferencesCreateEdit} from "./components/data/references/ReferencesCreateEdit/ReferencesCreateEdit";
import {ReferencesDetails} from "./components/data/references/ReferencesDetails/ReferencesDetails";

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

                        <Route path={routes.EDUCATION} element={<EducationList/>}/>
                        <Route path={routes.EDUCATION_CREATE} element={<EducationCreateEdit/>}/>
                        <Route path={routes.EDUCATION_EDIT} element={<EducationCreateEdit isEdit={true}/>}/>
                        <Route path={routes.EDUCATION_DETAILS} element={<EducationDetails/>}/>

                        <Route path={routes.REFERENCES} element={<ReferencesList/>}/>
                        <Route path={routes.REFERENCES_CREATE} element={<ReferencesCreateEdit/>}/>
                        <Route path={routes.REFERENCES_EDIT} element={<ReferencesCreateEdit isEdit={true}/>}/>
                        <Route path={routes.REFERENCES_DETAILS} element={<ReferencesDetails/>}/>
                    </Routes>
                </main>

                <footer>
                    <Credits/>
                </footer>
            </UserProvider>
        </LoadingProvider>
    );
}

