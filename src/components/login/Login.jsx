import React from 'react'
import { postItems } from '../helper/helper';
import cookie from 'react-cookies'

import './login.scss'

const Login = ({ setAuthUser }) => {
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
        setBtn('Wait loging')
        const LoginUser = async () => {
            try {
                const user = await postItems('https://qadir-bricks-company.herokuapp.com/api/v1/admin/login', state);
                if (user.status !== 200) return;
                cookie.save('jwt', user.data.token, { path: '/' })
                setAuthUser(true)
            } catch (error) {
                setErrorMessage(error.response.data.message)
                setTimeout(() => {
                    setErrorMessage('')
                    setBtn('Login Again')
                    setAuthUser(false)
                }, 1500);
            }
        }
        LoginUser()
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
