import React from 'react'
import './login.scss'

const Login = ({setAuthUser}) => {
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
        console.log(state);
        setAuthUser(true)
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
