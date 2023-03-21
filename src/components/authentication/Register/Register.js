import styles from './Register.module.css';
import {useContext, useState} from 'react';
import {AuthDataFields} from './AuthDataFields/AuthDataFields.js';
import {ProfileDataFields} from './ProfileDataFields/ProfileDataFields.js';
import {ErrorList} from '../../helpers/ErrorList/ErrorList.js';
import {validator} from '../../../utils/validation/validator.js';
import {RegisterContext} from './RegisterContext/RegisterContext.js';

export function Register() {
    const [tabIndex, setTabIndex] = useState(0);
    const [animation, setAnimation] = useState(false);
    const context = useContext(RegisterContext)

    function changeTabHandler(e) {
        e.preventDefault();
        // if(validator.hasErrors(context.authErrors) || validator.hasErrors(context.profileErrors)){
        //     return
        // }
        let tabIndex = Number(e.target.id);
        setTabIndex(tabIndex);
        setAnimation(true);
    }

    let tab = '';
    let tabLabelPosition = '';
    let tabName = '';
    let errorsData = ''
    switch (tabIndex) {
        case 0:
            tab = <AuthDataFields/>;
            tabLabelPosition = styles.left;
            tabName = 'Credentials';
            errorsData = context.authErrors
            break;
        case 1:
            tab = <ProfileDataFields/>;
            tabLabelPosition = styles.right;
            tabName = 'Profile';
            errorsData = context.profileErrors
            break;

        default:
            break;
    }

    function checkAllData(){
        Object.entries(context.authData).forEach(([name, value])=>{
            context.checkAllAuthData(name, value, context)
        })
    }

    function hoverHandler() {
        Object.entries(context.authData).forEach(([name, value])=>{
            context.checkAllAuthData(name, value, context)
        })
        validator.showAllErrors(context.setAuthErrors, true);
        validator.showAllErrors(context.setProfileErrors, true);
    }
    function submitHandler(e) {
        e.preventDefault()
        console.log(context.profileData)
        console.log(context.publicFields)
    }


    return (<section className={styles.container}>
        <div className={styles.btnWrapper}>
            <label
                className={styles.tabLabel + ' ' + tabLabelPosition}

            >{tabName}</label>
            <button
                className={styles.credentialsTabBtn}
                id={0}
                onClick={changeTabHandler}
            >Credentials
            </button>
            <button
                className={styles.profileTabBtn}
                id={1}
                onClick={changeTabHandler}
            >Profile
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