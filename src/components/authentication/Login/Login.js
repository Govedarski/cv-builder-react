import styles from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useContext, useRef, useState} from 'react';

import * as authService from '../../../services/authService/authService.js';
import {AuthContext} from '../../../context/AuthContext.js';
import {FormField} from '../../helpers/FormField/FormField.js';
import {ErrorList} from '../../helpers/ErrorList/ErrorList.js';
import {validateMinLength} from '../../../utils/validation/validation_functions.js';
import {validator} from '../../../utils/validation/validator.js';

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
        validator.validate(
            [validateMinLength.bind(null, 3)],
            name,
            value,
            setErrorData
        );
    };

    const checkAllFields = () => {
        Object.entries(loginData).forEach(([name, value]) => {
            checkField(name, value);
        });
    };
    const onChangeHandler = (e) => {
        if (errorData[e.target.name].length !== 0) {
            checkField(e.target.name, e.target.value);
            validator.showError(setErrorData, e.target.name, true);
        }
        setLoginData(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }));
        if (errorData.server.length !== 0) {
            validator.clearErrors(setErrorData, 'server');
        }
    };

    let loginBtnClass = styles.loginBtn;
    loginBtnClass = (validator.hasErrors(errorData))
        ? loginBtnClass + ' ' + styles.redLogin
        : loginBtnClass + ' ' + styles.greenLogin;

    const onHoverHandler = () => {
        checkAllFields();
        validator.showAllErrors(setErrorData, true);
    };

    const onBlurHandler = (e) => {
        checkField(e.target.name, e.target.value);
        validator.showError(setErrorData, e.target.name, true);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        checkAllFields();
        validator.showAllErrors(setErrorData, true);

        if (validator.hasErrors(errorData)) {
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
                validator.setErrors(setErrorData, 'server', errors);
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