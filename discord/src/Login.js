import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }
    return (
        <div className='login'>
            <div className="login_logo">
                <img src='https://resources.tidal.com/images/be9cbc72/8105/4319/926f/2e795ec7f52c/640x640.jpg' alt='discord logo' />
            </div>
            <Button onClick={signIn}> Sign in </Button>
        </div>
    )
}

export default Login;
