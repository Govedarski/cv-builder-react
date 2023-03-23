import styles from './Register.module.css';
import {useContext, useState} from 'react';
import {AuthFormFields} from './AuthFormFields/AuthFormFields.js';
import {ProfileFormFields} from './ProfileFormFields/ProfileFormFields.js';
import {ErrorList} from '../../helpers/ErrorList/ErrorList.js';
import {RegisterContext} from './RegisterContext/RegisterContext.js';

export function Register() {
    const [tabIndex, setTabIndex] = useState(0);
    const [animation, setAnimation] = useState(false);
    const context = useContext(RegisterContext);

    const hasError = context.authErrorManager.hasError() || context.profileErrorManager.hasError();

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
        console.log(context.profileData);
        console.log(context.publicFields);
    }

    console.log(errorsData);

    return (
        <section className={styles.container}>
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
        </section>
    );
}