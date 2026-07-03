/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  ArrowRight, 
  Check, 
  X, 
  AlertCircle, 
  Github, 
  ShieldCheck, 
  Loader2, 
  ArrowLeft, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

// Custom Type Definitions for better safety
type ViewType = 'login' | 'register' | 'forgot-password';
type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string;
  type: ToastType;
  id: number;
}

export default function App() {
  // Navigation & Form Views
  const [view, setView] = useState<ViewType>('login');
  
  // Input fields state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Interactive UI states
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Clear inputs when switching views
  useEffect(() => {
    setEmail('');
    setPassword('');
    setName('');
    setAgreeTerms(false);
    setForgotSubmitted(false);
  }, [view]);

  // Toast Helper
  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Password Strength Criteria Calculations
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  const strengthScore = [hasMinLength, hasUppercase, hasNumber, hasSpecial].filter(Boolean).length;

  const getStrengthMeta = () => {
    if (!password) return { label: 'Empty', color: 'bg-zinc-800', width: 'w-0', text: 'text-zinc-500' };
    switch (strengthScore) {
      case 1:
        return { label: 'Weak', color: 'bg-rose-500', width: 'w-1/4', text: 'text-rose-400' };
      case 2:
        return { label: 'Fair', color: 'bg-amber-500', width: 'w-2/4', text: 'text-amber-400' };
      case 3:
        return { label: 'Good', color: 'bg-indigo-500', width: 'w-3/4', text: 'text-indigo-400' };
      case 4:
        return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full', text: 'text-emerald-400' };
      default:
        return { label: 'Empty', color: 'bg-zinc-800', width: 'w-0', text: 'text-zinc-500' };
    }
  };

  const strengthMeta = getStrengthMeta();

  // Email validation helper
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  // Pre-fill helpers for interactive testing
  const handleQuickFill = (type: 'admin' | 'guest') => {
    if (type === 'admin') {
      setEmail('admin@obsidian.io');
      setPassword('AdminPass123!');
      showToast('Pre-filled secure Administrator credentials!', 'info');
    } else {
      setEmail('developer@obsidian.io');
      setPassword('DevSecOps99#');
      showToast('Pre-filled Developer Demo credentials!', 'info');
    }
  };

  // Handle Sign In submission
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email address.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    if (!password) {
      showToast('Please enter your password.', 'error');
      return;
    }

    setIsLoading(true);
    // Simulate secure network round-trip
    setTimeout(() => {
      setIsLoading(false);
      showToast(`Welcome back, ${email.split('@')[0]}! Access granted.`, 'success');
    }, 1500);
  };

  // Handle Registration submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter your full name.', 'error');
      return;
    }
    if (!email) {
      showToast('Please enter your email address.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    if (strengthScore < 3) {
      showToast('Please improve your password strength to at least "Good".', 'error');
      return;
    }
    if (!agreeTerms) {
      showToast('You must agree to the Terms of Service and Privacy Policy.', 'error');
      return;
    }

    setIsLoading(true);
    // Simulate signup request
    setTimeout(() => {
      setIsLoading(false);
      showToast('Account successfully provisioned! Please sign in.', 'success');
      setView('login');
    }, 1500);
  };

  // Handle Forgot Password submission
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your registered email address.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotSubmitted(true);
      showToast('Reset credentials dispatched successfully!', 'success');
    }, 1400);
  };

  return (
    <div 
      id="app_container" 
      className="min-h-screen bg-[#070913] text-zinc-100 flex flex-col justify-between relative overflow-hidden font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200"
    >
      {/* Decorative background grid and ambient glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating interactive notification stack */}
      <div id="toast-stack" className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            id={`toast-${t.id}`}
            className="pointer-events-auto flex items-start gap-3 bg-zinc-900/95 border border-zinc-800/80 backdrop-blur-md p-4 rounded-xl shadow-2xl shadow-black/40 animate-slide-in duration-300 transform translate-y-0 opacity-100"
          >
            {t.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            {t.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            {t.type === 'info' && (
              <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-200">{t.message}</p>
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded-lg hover:bg-zinc-800/60"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Main Header / Top Branding */}
      <header id="app_header" className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-10">
        <div id="logo_group" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform duration-300">
            <ShieldCheck className="w-5.5 h-5.5 text-zinc-950 stroke-[2.2]" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Priority Platform
            </h1>
            <p className="text-[10px] text-indigo-400/80 font-mono tracking-wider uppercase">
              One platform for all problems
            </p>
          </div>
        </div>
        
        {/* Subtle quick indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-500 font-mono bg-zinc-900/60 border border-zinc-800 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Node Active</span>
        </div>
      </header>

      {/* Main Container */}
      <main id="main_content" className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div id="login_card_wrapper" className="w-full max-w-md">
          
          {/* Obsidian login box card */}
          <div 
            id="auth_card" 
            className="bg-zinc-950/80 border border-zinc-900/90 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-3xl shadow-black/70 flex flex-col relative overflow-hidden"
          >
            {/* Glossy top border gradient line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

            {/* Inner conditional states */}
            {view !== 'forgot-password' ? (
              <>
                {/* Header title state */}
                <div id="card_head" className="mb-6 text-center sm:text-left">
                  <h2 className="text-2xl font-semibold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
                    {view === 'login' ? 'Welcome back' : 'Create an account'}
                  </h2>
                </div>

                {/* Switcher Pill Controls */}
                <div id="auth_switcher" className="grid grid-cols-2 bg-zinc-900/60 p-1 rounded-xl mb-6 border border-zinc-800/40">
                  <button
                    id="switch_login_btn"
                    onClick={() => setView('login')}
                    className={`py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                      view === 'login' 
                        ? 'bg-zinc-800 text-white shadow-sm shadow-black/20' 
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    id="switch_register_btn"
                    onClick={() => setView('register')}
                    className={`py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                      view === 'register' 
                        ? 'bg-zinc-800 text-white shadow-sm shadow-black/20' 
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* SOCIAL IDENTITY PROVIDERS (OAUTH MOCKS) */}
                <div id="oauth_providers" className="grid grid-cols-2 gap-3 mb-5">
                  <button
                    id="google_oauth_btn"
                    onClick={() => showToast('Redirecting securely to Google Identity Service...', 'info')}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-indigo-500/50 text-sm font-medium text-zinc-300 hover:text-white transition-all active:scale-[0.98] duration-150 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google</span>
                  </button>

                  <button
                    id="github_oauth_btn"
                    onClick={() => showToast('Redirecting securely to GitHub OAuth portal...', 'info')}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 text-sm font-medium text-zinc-300 hover:text-white transition-all active:scale-[0.98] duration-150 cursor-pointer"
                  >
                    <Github className="w-4 h-4 text-zinc-300" />
                    <span>GitHub</span>
                  </button>
                </div>

                <div id="divider" className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-800/80" />
                  </div>
                  <span className="relative px-3 bg-[#0B0F19] text-xs uppercase font-mono text-zinc-500 tracking-widest bg-zinc-950">
                    or continue with
                  </span>
                </div>

                {/* SIGN IN VIEW FORM */}
                {view === 'login' && (
                  <form id="signin_form" onSubmit={handleSignIn} className="space-y-4">
                    {/* Email Input */}
                    <div id="signin_email_group" className="space-y-1.5">
                      <label htmlFor="signin_email" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Secure Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          id="signin_email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full bg-zinc-900/50 hover:bg-zinc-900/80 focus:bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500/20"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div id="signin_password_group" className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label htmlFor="signin_password" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Password
                        </label>
                        <button
                          type="button"
                          id="goto_forgot_btn"
                          onClick={() => setView('forgot-password')}
                          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          id="signin_password"
                          type={passwordVisible ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-zinc-900/50 hover:bg-zinc-900/80 focus:bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-12 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500/20"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                          disabled={isLoading}
                        >
                          {passwordVisible ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Checkbox */}
                    <div id="signin_options" className="flex items-center justify-between pt-1">
                      <label htmlFor="remember_me" className="flex items-center gap-2.5 cursor-pointer select-none">
                        <div className="relative flex items-center">
                          <input
                            id="remember_me"
                            type="checkbox"
                            className="peer sr-only"
                          />
                          <div className="w-5 h-5 bg-zinc-900 border border-zinc-800 rounded-md peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-zinc-950 stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <span className="text-sm text-zinc-400 hover:text-zinc-300 transition-colors">
                          Keep this terminal remembered
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="signin_submit_btn"
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Establishing Link...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In Securely</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* SIGN UP VIEW FORM */}
                {view === 'register' && (
                  <form id="register_form" onSubmit={handleRegister} className="space-y-4">
                    
                    {/* Full Name Input */}
                    <div id="register_name_group" className="space-y-1.5">
                      <label htmlFor="register_name" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="register_name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full bg-zinc-900/50 hover:bg-zinc-900/80 focus:bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500/20"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div id="register_email_group" className="space-y-1.5">
                      <label htmlFor="register_email" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Secure Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          id="register_email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full bg-zinc-900/50 hover:bg-zinc-900/80 focus:bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500/20"
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Password Input */}
                    <div id="register_password_group" className="space-y-1.5">
                      <label htmlFor="register_password" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                        Strong Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          id="register_password"
                          type={passwordVisible ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full bg-zinc-900/50 hover:bg-zinc-900/80 focus:bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-12 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500/20"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                          disabled={isLoading}
                        >
                          {passwordVisible ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Dynamic Strength Indicator Panel */}
                    <div id="password_strength_panel" className="bg-zinc-900/30 border border-zinc-900/60 p-3.5 rounded-xl space-y-2.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-400">Password Strength:</span>
                        <span className={`font-semibold ${strengthMeta.text}`}>{strengthMeta.label}</span>
                      </div>
                      
                      {/* Interactive Progress bar */}
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className={`h-full ${strengthMeta.color} ${strengthMeta.width} transition-all duration-300`} />
                      </div>

                      {/* Criteria checkgrid */}
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${hasMinLength ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            {hasMinLength ? <Check className="w-2.5 h-2.5" /> : <div className="w-1 h-1 rounded-full bg-zinc-500" />}
                          </div>
                          <span className={hasMinLength ? 'text-zinc-300 font-medium' : 'text-zinc-500'}>Min 8 characters</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${hasUppercase ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            {hasUppercase ? <Check className="w-2.5 h-2.5" /> : <div className="w-1 h-1 rounded-full bg-zinc-500" />}
                          </div>
                          <span className={hasUppercase ? 'text-zinc-300 font-medium' : 'text-zinc-500'}>Uppercase letter</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${hasNumber ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            {hasNumber ? <Check className="w-2.5 h-2.5" /> : <div className="w-1 h-1 rounded-full bg-zinc-500" />}
                          </div>
                          <span className={hasNumber ? 'text-zinc-300 font-medium' : 'text-zinc-500'}>At least one number</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 ${hasSpecial ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            {hasSpecial ? <Check className="w-2.5 h-2.5" /> : <div className="w-1 h-1 rounded-full bg-zinc-500" />}
                          </div>
                          <span className={hasSpecial ? 'text-zinc-300 font-medium' : 'text-zinc-500'}>Special symbol</span>
                        </div>
                      </div>
                    </div>

                    {/* Agree Terms Checkbox */}
                    <div id="terms_group" className="pt-1">
                      <label htmlFor="agree_terms" className="flex items-start gap-2.5 cursor-pointer select-none">
                        <div className="relative flex items-center mt-0.5">
                          <input
                            id="agree_terms"
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="peer sr-only"
                          />
                          <div className="w-5 h-5 bg-zinc-900 border border-zinc-800 rounded-md peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-zinc-950 stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
                          </div>
                        </div>
                        <span className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors leading-normal">
                          I consent to the <span className="text-indigo-400 hover:underline">Terms of Service</span> and <span className="text-indigo-400 hover:underline">Privacy Protocols</span>.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="register_submit_btn"
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Provisioning Vault...</span>
                        </>
                      ) : (
                        <>
                          <span>Register Terminal</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </>
            ) : (
              /* FORGOT PASSWORD VIEW FORM */
              <div id="forgot_view" className="space-y-5">
                <button
                  type="button"
                  id="forgot_back_btn"
                  onClick={() => setView('login')}
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-medium cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Sign In</span>
                </button>

                {!forgotSubmitted ? (
                  <>
                    <div id="forgot_head">
                      <h2 className="text-xl font-semibold text-white tracking-tight">
                        Vault Key Recovery
                      </h2>
                      <p className="text-sm text-zinc-400 mt-1">
                        Input your registered email. If matched in our records, we'll transmit key restoration instructions.
                      </p>
                    </div>

                    <form id="forgot_form" onSubmit={handleForgotPassword} className="space-y-4">
                      <div id="forgot_email_group" className="space-y-1.5">
                        <label htmlFor="forgot_email" className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                          Registered Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            id="forgot_email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@company.com"
                            className="w-full bg-zinc-900/50 hover:bg-zinc-900/80 focus:bg-zinc-900 border border-zinc-800 focus:border-indigo-500 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-1 focus:ring-indigo-500/20"
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        id="forgot_submit_btn"
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <span>Send Key Restoration Code</span>
                        )}
                      </button>
                    </form>
                  </>
                ) : (
                  /* POST-FORGOT SUCCESS SCREEN */
                  <div id="forgot_success_state" className="text-center py-4 space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
                      <Check className="w-8 h-8 stroke-[2.5]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white">Transmissions Dispatched</h3>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        We have successfully dispatched a verification code to <span className="text-indigo-400 font-medium">{email}</span>. Please verify your inbox and follow the guided restoration sequence.
                      </p>
                    </div>
                    <button
                      type="button"
                      id="forgot_done_btn"
                      onClick={() => setView('login')}
                      className="inline-flex items-center justify-center py-2 px-6 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 font-medium rounded-xl text-sm transition-all cursor-pointer"
                    >
                      Return to Access Desk
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Main Footer */}
      <footer id="app_footer" className="w-full max-w-7xl mx-auto px-6 py-5 text-center relative z-10 border-t border-zinc-900/50 mt-auto">
        <p className="text-xs text-zinc-600 font-mono">
          &copy; {new Date().getFullYear()} Priority Platform. All transmission logs are private and secure.
        </p>
      </footer>
    </div>
  );
}
