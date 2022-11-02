import React from 'react'

import './login.scss'
import { LoginUser } from '../../stateRedux/features/adminSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();

    const [btn, setBtn] = React.useState('Login')
    const [errorMessage, setErrorMessage] = React.useState('')
    const [state, setState] = React.useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setState(prev => {
            return ({
                ...prev,
                [e.target.name]: e.target.value
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setBtn('Processing..')
        const LoginAsync = async () => {
            try {
                dispatch(LoginUser(state))
            } catch (error) {
                console.log(error);
                setErrorMessage(error.response.data.message)
                setTimeout(() => {
                    setErrorMessage('')
                    setBtn('Login Failed')
                }, 1500);
            }
        }
        LoginAsync()
    }
    return (
        <div className='login-user'>
            <div className="login-user__container">
                <h3 className='errorMessage'>{errorMessage}</h3>

                <form onSubmit={handleSubmit} >
                    <h2>Login </h2>
                    <label htmlFor="email">Enter email-address</label>
                    <input type="email" id='email' name='email' onChange={handleChange} value={state.email} required />
                    <label htmlFor="password">Enter password</label>
                    <input type="password" id='password' name='password' onChange={handleChange} value={state.password} required />
                    <input type="submit" value={btn} />
                </form>
            </div>
        </div>
    )
}

export default Login
