import styles from './Register.module.css';
import {useContext, useState} from 'react';
import {AuthDataFields} from './AuthDataFields/AuthDataFields.js';
import {ProfileDataFields} from './ProfileDataFields/ProfileDataFields.js';
import {ErrorList} from '../../helpers/ErrorList/ErrorList.js';
import {RegisterContext} from './RegisterContext/RegisterContext.js';
import {errorManager} from '../../../utils/errorManager/errorManager.js';

export function Register() {
    const [tabIndex, setTabIndex] = useState(0);
    const [animation, setAnimation] = useState(false);
    const context = useContext(RegisterContext);
    const hasError = errorManager.hasError(context.authErrors) || errorManager.hasError(context.profileErrors);

    function changeTabHandler(e) {
        e.preventDefault();
        // if (hasError) {
        //     return;
        // }
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
            tab = <AuthDataFields/>;
            tabLabelPosition = styles.left;
            tabName = 'Credentials';
            errorsData = context.authErrors;
            break;
        case 1:
            tab = <ProfileDataFields/>;
            tabLabelPosition = styles.right;
            tabName = 'Profile';
            errorsData = context.profileErrors;
            break;

        default:
            break;
    }

    function checkAllData() {
        Object.entries(context.authData).forEach(([name, value]) => {
            context.checkAllAuthData(name, value, context);
        });
    }

    function hoverHandler() {
        Object.entries(context.authData).forEach(([name, value]) => {
            context.checkAllAuthData(name, value, context);
        });
        errorManager.showAllErrors(context.setAuthErrors, true);
        errorManager.showAllErrors(context.setProfileErrors, true);
    }

    function submitHandler(e) {
        e.preventDefault();
        console.log(context.profileData);
        console.log(context.publicFields);
    }

    console.log(errorsData)

    return (<section className={styles.container}>
        <div
            className={styles.btnWrapper + ' ' + (hasError && styles.tabLabelError)}
        >
            <label
                className={styles.tabLabel + ' ' + tabLabelPosition}

            >{tabName}</label>
            <button
                className={styles.credentialsTabBtn}
                id={0}
                title={hasError ? 'Profile form is incomplete!' : ''}
                style={hasError ? {cursor: 'default'} : {}}
                onClick={changeTabHandler}
            >
                Credentials
            </button>
            <button
                className={styles.profileTabBtn}
                id={1}
                title={hasError ? 'Credentials form is incomplete!' : ''}
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
                className={styles.registerBtn}
                onMouseEnter={hoverHandler}
            >
                Register
            </button>
        </form>
        <ErrorList errorData={errorsData}/>
    </section>);
}