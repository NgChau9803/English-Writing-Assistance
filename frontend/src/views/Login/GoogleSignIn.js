import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./GoogleSignIn.css";

function GoogleSignIn() {
    const navigate = useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('authToken');

        if (token) {
            localStorage.setItem('token', token);
            navigate('/dashboard');
        }
    }, [navigate]);

    const googleAuth = () => {
        window.open(`http://localhost:5000/auth/google`, "_self");
    };

    return (
        <div className="container">
            <h1 className="heading">Authenticate</h1>
            <div className="form_container">
                <div className="right">
                    <button className="google_btn" onClick={googleAuth}>
                        <img src="google.png" alt="google icon" />
                        <span>Sign in with Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GoogleSignIn;
