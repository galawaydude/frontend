import React, { useState } from 'react';
import OAuth from '../../../components/oauth/OAuth';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState(''); // Add OTP state
    const [error, setError] = useState('');
    const [otpSent, setOtpSent] = useState(false); // OTP sent flag


    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form submission
      console.log('Registration form submitted with:', { name, email, password });

      try {
          const response = await fetch('https://demotestmern.azurewebsites.net/api/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ name, email, password }),
          });

          const data = await response.json();
          console.log('Registration response:', data);

          if (!response.ok) {
              throw new Error(data.message || 'Registration failed');
          }

          // On successful registration, redirect or show success message
          console.log('Registration successful, redirecting...');
          navigate('/'); // Redirect to homepage or desired route

      } catch (error) {
          console.error('Error during registration:', error);
          setError(error.message);
      }
  };
  
    // const handleSubmit = async (e) => {
    //     e.preventDefault(); // Prevent default form submission
    //     console.log('Registration form submitted with:', { name, email, password });

    //     try {
    //         const response = await fetch('https://demotestmern.azurewebsites.net/api/auth/register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify({ name, email, password }),
    //         });

    //         const data = await response.json();
    //         console.log('Registration response:', data);

    //         if (!response.ok) {
    //             throw new Error(data.message || 'Registration failed');
    //         }

    //         setOtpSent(true); // OTP sent
    //         console.log('OTP sent successfully, please check your email.');

    //     } catch (error) {
    //         console.error('Error during registration:', error);
    //         setError(error.message);
    //     }
    // };

    // const handleVerifyOtp = async (e) => {
    //     e.preventDefault();
    //     console.log('OTP verification submitted with:', { email, otp });

    //     try {
    //         const response = await fetch('https://demotestmern.azurewebsites.net/api/auth/verify-otp', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email, otp }),
    //         });

    //         const data = await response.json();
    //         console.log('OTP verification response:', data);

    //         if (!response.ok) {
    //             throw new Error(data.message || 'OTP verification failed');
    //         }

    //         // On successful verification, redirect
    //         console.log('OTP verified successfully, redirecting...');
    //         navigate('/');

    //     } catch (error) {
    //         console.error('Error during OTP verification:', error);
    //         setError(error.message);
    //     }
    // };


  return (
    <div className="login-maincon section container">
      <div className="login-con">
        <div className="login-head">
          <h3>Sign up</h3>
        </div>
        <div className="login-form-con">
  
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-component">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-component">
              <label>Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-component">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button className="btn btn-primary" type="submit">
              Sign up
            </button> 
          </form> 
            <div className="using-google">
              <p>or</p>
              <OAuth />
            </div>
            <p className="login-text">
              Don't have an account? <span className="text-blue-700">Login</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
