import styles from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useContext, useState} from 'react';

import * as authService from '../../../services/authService/authService.js';
import {AuthContext} from '../../../context/AuthContext.js';
import {FormField} from '../../helpers/FormField/FormField.js';
import {ErrorList} from '../../helpers/ErrorList/ErrorList.js';
import {ValidateMinLength} from '../../../utils/validation/validators.js';
import {validationManager} from '../../../utils/validation/validatonManager.js';
import {errorManager} from '../../../utils/errorManager/errorManager.js';

export function Login({setIsLoading}) {
    const {userLogin} = useContext(AuthContext);
    const navigate = useNavigate();
    const [isPasswordVisible, togglePasswordVisibility] = useState(false);
    const [loginData, setLoginData] = useState({identifier: '', password: ''});
    const [errorData, setErrorData] = useState({identifier: [], password: [], server: []});

    const passwordVisibilityHandler = () => {
        togglePasswordVisibility(prevState => !prevState);
    };
    const eyeClass = isPasswordVisible ? 'fa-eye-slash' : 'fa-eye';

    const checkField = (name, value) => {
        validationManager.validate(
            [new ValidateMinLength(3)],
            name,
            value,
            setErrorData
        );
    };

    const onChangeHandler = (e) => {
        if (errorData[e.target.name].length !== 0) {
            checkField(e.target.name, e.target.value);
            errorManager.showErrorsFor(e.target.name, setErrorData, true);
        }
        setLoginData(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }));
        if (errorData.server.length !== 0) {
            errorManager.clearErrors(setErrorData, 'server');
        }
    };

    let loginBtnClass = styles.loginBtn;
    loginBtnClass = (errorManager.hasError(errorData))
        ? loginBtnClass + ' ' + styles.redLogin
        : loginBtnClass + ' ' + styles.greenLogin;

    const onHoverHandler = () => {
        validationManager.checkData(loginData, checkField);
        errorManager.showAllErrors(setErrorData, true);
    };

    const onBlurHandler = (e) => {
        checkField(e.target.name, e.target.value);
        errorManager.showErrorsFor(e.target.name, setErrorData, true);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        validationManager.checkData(loginData, checkField);
        errorManager.showAllErrors(setErrorData, true);

        if (errorManager.hasError(errorData)) {
            return;
        }
        setIsLoading(true);
        authService.loginJobSeeker(loginData.identifier, loginData.password)
            .then(result => {
                if (!result) {
                    return;
                }
                userLogin(result);
                navigate('/');
                setIsLoading(false);
            })
            .catch(er => {
                const errors = [{error: er.message, show: true}];
                errorManager.setErrors(setErrorData, 'server', errors);
                setIsLoading(false);
            });
    };

    return (<section className={styles.loginContainer}>
        <form className={styles.flexColumnCenter} onSubmit={onSubmitHandler}>
            <h1>Login</h1>
            <FormField
                id={'identifier'}
                name={'identifier'}
                type={'text'}
                placeholder={'email or username'}
                value={loginData.identifier}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />
            <label htmlFor="password">Password:</label>
            <div className={styles.passwordWrapper}>
                <FormField
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder={'Password'}
                    name={'password'}
                    id={'password'}
                    label={null}
                    value={loginData.password}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                />
                <i
                    className={'fa-solid ' + eyeClass}
                    onClick={passwordVisibilityHandler}/>
            </div>
            <button
                className={loginBtnClass}
                onMouseEnter={onHoverHandler}
            >
                Login
            </button>
            <ErrorList errorData={errorData}/>
        </form>
        <div className={styles.flexColumnCenter}>
            <button className={styles.facebookBtn}>
                <i className="fa-brands fa-square-facebook"/>Login with Facebook
            </button>
            <button className={styles.googleBtn}>
                <i className="fa-brands fa-google"/>Login with Google
            </button>
        </div>
        <div className={styles.flexColumnCenter}>
            <h3>Don't have an account?</h3>
            <Link to="/register">SING UP NOW</Link>
        </div>
    </section>);
}