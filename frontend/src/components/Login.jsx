import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Request OTP, 2: Verify OTP
  const [message, setMessage] = useState('');

  const requestOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/send-otp', { email });
      setMessage(response.data.message);
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error sending OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/verify-otp', { email, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error verifying OTP');
    }
  };

  return (
    <div className="container">
      <h2 className="header">OTP Login</h2>
      {step === 1 && (
        <div className="form-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <button onClick={requestOtp} className="button">Send OTP</button>
        </div>
      )}
      {step === 2 && (
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="input"
          />
          <button onClick={verifyOtp} className="button">Verify OTP</button>
        </div>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;
