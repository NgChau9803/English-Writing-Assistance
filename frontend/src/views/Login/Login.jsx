import React, { useState } from 'react';
import './Login.css';

const LoginSignup = () => {

  const [action, setAction] = useState('Login');

  const handleActionChange = (newAction) => {
    setAction(newAction);
  };

  const handlePasswordToggle = () => {
    const passwordInput = document.querySelector('.input input[type="password"]');
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
    // Optionally, update the icon class ('bx bx-hide' vs 'bx bx-show') based on visibility
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text' onClick={() => handleActionChange('Login')}>{action}</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        {action === 'Sign Up' ? <div></div> : <div className='sign'>
          <input type='text' placeholder='Username' required/>
        </div>}

        {action === 'Sign Up' ? <div></div> : <div className='sign'>
          <input type='password' placeholder='Password' required/>
          <i className='bx bx-hide eye-icon' onClick={handlePasswordToggle}></i>
        </div>}
        
        {action === 'Login' ? <div></div> : <div className='input'>
        <input type="tel" placeholder="Phone Number" required/>
        </div>}
        
        {action === 'Login' ? <div></div> : <div className='input'>
          <input type='text' placeholder='Username' required/>
        </div>}

        {action === 'Login' ? <div></div> : <div className='input'>
          <input type='password' placeholder='Password' required/>
          <i className='bx bx-hide eye-icon' onClick={handlePasswordToggle}></i>
        </div>}

        {action === 'Login' ? <div></div> : <div className='input'>
          <input type='password' placeholder='Re-enter the password' required/>
          <i className='bx bx-hide eye-icon' onClick={handlePasswordToggle}></i>
        </div>}

        {/* {action === 'Sign Up' ? <div></div> : <div className='forgot-password'><span onClick={() => console.log("Forgot Password clicked")}>Forgot Password?</span></div>}         */}
        <div className='submit-container'>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => handleActionChange('Login')}>Login</div>
        </div>
      </div>

      {/* {action === 'Sign Up' ? <div></div> : <div className='signup'>
        Don't have an account? <span onClick={() => handleActionChange('Sign Up')}className='link'>Sign Up</span>.
      </div>} */}

      {/* {action === 'Login' ? <div></div> : <div className='signin'>
        Already have an account? <span onClick={() => handleActionChange('Login')}className='link'>Sign In</span>.
      </div>} */}

      <div class="line"></div>
    </div>
  );
};

export default LoginSignup;
