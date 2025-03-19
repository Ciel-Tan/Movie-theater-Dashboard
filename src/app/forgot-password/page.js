'use client'

import Loader from '@/components/loading/Loader';
import { usePostAccount } from '@/hooks/usePostAccount';
import '@/styles/forgot-password.css';
import { toast } from '@/utils/toast';
import Link from 'next/link';
import { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const { Forgot_Password, loading, response, error } = usePostAccount();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        
        await Forgot_Password(email);

        error ? toast.error(error) : toast.success(response);
        setEmail('');
    };

    return (
        <div id="content">
            <div className="forgot-card">
                <div className="forgot-card-content">
                    <div className="forgot-text-center">
                        <h1 className="forgot-title">Forgot password?</h1>
                        <p className="forgot-loginPrompt forgot-mt-2">
                            Enter your email and we will send a password reset.
                        </p>
                    </div>
                    <div className="forgot-form-container">
                        <form onSubmit={handleForgotPassword}>
                            <div className="forgot-grid">
                                <div>
                                    <label className="forgot-form-label" htmlFor="email">Email</label>
                                    <div className="forgot-relative">
                                        <input
                                            className="forgot-form-input"
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            aria-describedby="email-error"
                                            placeholder='Enter your email'
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                        />
                                    </div>
                                    <p className="forgot-error" id="email-error">
                                        Please include a valid email address so we can get back to you
                                    </p>
                                </div>
                                <button className="forgot-form-button" type="submit">
                                    {loading ? <Loader /> : 'Reset password'}
                                </button>
                            </div>
                        </form>

                        <p className="forgot-loginPrompt forgot-mt-4">
                            Remember your password? <Link className="forgot-loginLink" href="/login">Access login here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
