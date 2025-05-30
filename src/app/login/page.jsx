'use client';

import Loader from "@/components/loading/Loader";
import { useAuth } from "@/hooks/useAuth";
import { createCookieToken } from "@/utils/cookie";
import { decodeToken } from "@/utils/decodeToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { Login, loading, error } = useAuth();

  const checkAuth = async (payload) => {
    const decodePayload = await decodeToken(payload.token);

    if (decodePayload.role_name === 'admin') {
      createCookieToken(payload);
      window.location.href = '/';
    }
    else {
      router.push('/403-forbidden');
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const payload = await Login({ email, password });
    
    await checkAuth(payload);
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

        <button
          className="google-sign-in"
          onClick={() => signIn('google')}
        >
          <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Logo" />
          <span>Sign in with Google</span>
        </button>
        {error && <div className="error">{error}</div>}
      </div>

      <div className="login-bg" />
    </div>
  );
}
 
export default Login;