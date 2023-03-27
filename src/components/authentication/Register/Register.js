import styles from './Register.module.css';
import {useContext, useState} from 'react';
import {AuthFormFields} from './AuthFormFields/AuthFormFields.js';
import {ProfileFormFields} from './ProfileFormFields/ProfileFormFields.js';
import {ErrorList} from '../../helpers/ErrorList/ErrorList.js';
import {RegisterContext} from './RegisterContext/RegisterContext.js';
import {camelCaseTextToSnakeCase, changeObjectKeysNaming, formatDate} from '../../../utils/helper_functions.js';
import {register} from '../../../services/authService/authService.js';
import {AuthContext} from '../../../context/AuthContext.js';
import {useNavigate} from 'react-router-dom';
import {LoadingContext} from '../../../context/LoadingContext.js';

export function Register() {
    const [tabIndex, setTabIndex] = useState(0);
    const [animation, setAnimation] = useState(false);
    const context = useContext(RegisterContext);
    const {userLogin} = useContext(AuthContext);
    const {setIsLoading} = useContext(LoadingContext);
    const navigate = useNavigate();


    const hasError = context.authErrorManager.hasError() || context.profileErrorManager.hasError();

    function changeTabHandler(e) {
        e.preventDefault();
        if (hasError) {
            return;
        }
        let tabIndex = Number(e.target.id);
        setTabIndex(tabIndex);
        setAnimation(true);
    }

    let tab = '';
    let tabLabelPosition = '';
    let tabName = '';
    let errorsData = '';
    switch (tabIndex) {
        case 0:
            tab = <AuthFormFields/>;
            tabLabelPosition = styles.left;
            tabName = 'Credentials';
            errorsData = context.authErrorManager.errorData;
            break;
        case 1:
            tab = <ProfileFormFields/>;
            tabLabelPosition = styles.right;
            tabName = 'Profile';
            errorsData = context.profileErrorManager.errorData;
            break;
        default:
            break;
    }

    function hoverHandler() {
        Object.entries(context.authData).forEach(([name, value]) => {
            context.checkAllAuthData(name, value);
        });
        context.authErrorManager.showAllErrors(true);
        context.profileErrorManager.showAllErrors(true);
    }

    function submitHandler(e) {
        e.preventDefault();
        Object.entries(context.authData).forEach(([name, value]) => {
            context.checkAllAuthData(name, value);
        });
        context.authErrorManager.showAllErrors(true);
        context.profileErrorManager.showAllErrors(true);

        if (hasError) {
            return;
        }

        setIsLoading(true);
        let profileData = {
            ...context.profileData,
            publicFields: context.publicFields,
            profilePictureBinary: context.profilePicture.binary,
            profilePictureExtension: context.profilePicture.extension
        };
        profileData.dateOfBirth = formatDate(profileData.dateOfBirth, 'dd/MM/yyyy');

        const {email, username, password} = context.authData;
        register(
            {email, username, password},
            changeObjectKeysNaming(profileData, camelCaseTextToSnakeCase)
        ).then(result => {
            setIsLoading(false);
            if (!result) {
                return;
            }
            userLogin(result);
            navigate('/');
        }).catch(
            error => {
                if (error.message.type === 'Unique constraint violation') {
                    setTabIndex(0);
                    context.authErrorManager.setErrors('server',
                        [{error: error.message.email},
                            {error: error.message.username}]);
                    context.authErrorManager.showErrorsFor('server');
                    return;
                }
                alert('Something went wrong on our server. Please try again later.');
                setIsLoading(false);
            }
        );
    }


    return (
        <section className={styles.container}>
            <div
                className={styles.btnWrapper + ' ' + (hasError && styles.tabLabelError)}
                onMouseEnter={hoverHandler}
            >
                <h1
                    className={styles.registerTitle}

                >REGISTER</h1>
                <label
                    className={styles.tabLabel + ' ' + tabLabelPosition}

                >{tabName}</label>
                <button
                    className={styles.credentialsTabBtn}
                    id={0}
                    title={hasError ? 'Error occurred in your profile\'s data!' : ''}
                    style={hasError ? {cursor: 'default'} : {}}
                    onClick={changeTabHandler}
                >
                    Credentials
                </button>
                <button
                    className={styles.profileTabBtn}
                    id={1}
                    title={hasError ? 'Error occurred in your credential\'s data!' : ''}
                    style={hasError ? {cursor: 'default'} : {}}

                    onClick={changeTabHandler}
                >
                    Profile
                </button>
            </div>

            <form
                className={styles.registerForm}
                onSubmit={submitHandler}
            >
                <div
                    className={styles.fieldsWrapper + ' ' + (animation ? styles.appearFields : '')}
                    style={tabIndex === 0 ? {flexDirection: 'column', maxWidth: '100%'} : {}}
                    onAnimationEnd={() => setAnimation(false)}
                >
                    {tab}
                </div>
                <button
                    className={styles.submitBtn + ' ' + (hasError ? styles.red : styles.green)}
                    onMouseEnter={hoverHandler}
                >
                    Register
                </button>
            </form>
            <ErrorList errorData={errorsData}/>
        </section>
    );
}