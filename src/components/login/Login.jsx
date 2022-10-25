import React from 'react'
import { postItems } from '../helper/helper';
import cookie from 'react-cookies'

import './login.scss'

const Login = ({ setAuthUser }) => {
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
        const LoginUser = async()=>{
            const user = await postItems('https://qadir-bricks-company.herokuapp.com/api/v1/admin/login',state);
            if(user.status !== 200) return;
            cookie.save('jwt', user.data.token, { path: '/' })
            setAuthUser(true)
        }
        // setAuthUser(true)
        LoginUser()
    }
    return (
        <div className='login-user'>
            <div className="login-user__container">
                <form onSubmit={handleSubmit} >
                    <h2>Login </h2>
                    <label htmlFor="email">Enter email-address</label>
                    <input type="email" id='email' name='email' onChange={handleChange} value={state.email} required />
                    <label htmlFor="password">Enter password</label>
                    <input type="password" id='password' name='password' onChange={handleChange} value={state.password} required />
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Login
