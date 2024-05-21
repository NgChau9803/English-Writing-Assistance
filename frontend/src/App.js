import React from 'react';
import './App.css';
import './index.css';
import LoginSignup from './views/LoginSignup/LoginSignup';
import { GoogleLogin } from '@react-oauth/google';

function App() {
    const responseMessage = (response) => {
        console.log(response);
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    return (
        <div>
            <h2></h2>
            <br />
            <br />
            <LoginSignup />
            <div className="google-login-container">
                <GoogleLogin onSuccess={responseMessage} onError={errorMessage} className="google-login-button" />
            </div>
        </div>
    );
}

export default App;
