'use client';

import Loader from "@/components/loading/Loader";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { Login, loading, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    await Login({ email, password });
    
    if (!error) {
      router.push('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="header">
          <h1>Welcome Back</h1>
          <p>Enter your email and password to access your account.</p>
        </div>

        <form className="form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="password-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </div>
          </div>
          <div className="form-options">
            <div className="checkbox-group">
              <input type="checkbox" id="remember" />
              <label>Remember me</label>
            </div>
            <Link href="/forgot-password" className="forgot-password">
              Forgot Password
            </Link>
          </div>
          <button type="submit" className="sign-in">
            {loading ? <Loader /> : 'Sign In'}
          </button>
        </form>

        <div className="google-sign-in">
          <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Logo" />
          <span>Sign in with Google</span>
        </div>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="login-bg" />
    </div>
  );
}
 
export default Login;