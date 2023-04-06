import styles from './Login.module.css';
import {Link, useNavigate} from 'react-router-dom';
import {useContext, useState} from 'react';

import * as authService from '../../../services/authService/authService.js';
import {UserContext} from '../../../context/UserContext.js';
import {FormField} from '../../helpers/FormField/FormField.js';
import {ErrorList} from '../../helpers/ErrorList/ErrorList.js';
import {ValidateMinLength} from '../../../utils/validation/validators/validators.js';
import {validationManager} from '../../../utils/validation/validatonManager.js';
import {useErrorManager} from '../../../hooks/useErrorManager.js';
import {LoadingContext} from '../../../context/LoadingContext.js';
import {routes} from '../../../constants/routes.js';

export function Login() {
    const {userLogin} = useContext(UserContext);
    const {setIsLoading} = useContext(LoadingContext);
    const navigate = useNavigate();
    const [isPasswordVisible, togglePasswordVisibility] = useState(false);
    const [loginData, setLoginData] = useState({identifier: '', password: ''});
    const errorManager = useErrorManager({identifier: [], password: [], server: []});

    const passwordVisibilityHandler = () => {
        togglePasswordVisibility(prevState => !prevState);
    };
    const eyeClass = isPasswordVisible ? 'fa-eye-slash' : 'fa-eye';

    const checkField = (name, value) => {
        validationManager.validate(
            [new ValidateMinLength(3)],
            name,
            value,
            errorManager
        );
    };

    const onChangeHandler = (e) => {
        if (errorManager.didFieldShowErrors(e.target.name)) {
            checkField(e.target.name, e.target.value);
            errorManager.showErrorsFor(e.target.name,);
        }
        setLoginData(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }));
        if (errorManager.didFieldShowErrors('server')) {
            errorManager.clearErrors('server');
        }
    };

    let loginBtnClass = styles.loginBtn;
    loginBtnClass = (errorManager.hasError())
        ? loginBtnClass + ' ' + styles.redLogin
        : loginBtnClass + ' ' + styles.greenLogin;

    const onHoverHandler = () => {
        validationManager.checkData(loginData, checkField);
        errorManager.showAllErrors();
    };

    const onBlurHandler = (e) => {
        checkField(e.target.name, e.target.value);
        errorManager.showErrorsFor(e.target.name);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        validationManager.checkData(loginData, checkField);
        errorManager.showAllErrors();

        if (errorManager.hasError()) {
            return;
        }
        setIsLoading(true);
        authService.loginJobSeeker(loginData.identifier, loginData.password)
            .then(result => {
                setIsLoading(false);
                if (!result) {
                    return;
                }
                userLogin(result);
                navigate(routes.HOME);
            })
            .catch(er => {
                const errors = [{error: er.message}];
                errorManager.setErrors('server', errors);
                errorManager.showErrorsFor('server');
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
            <ErrorList errorData={errorManager.errorData}/>
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