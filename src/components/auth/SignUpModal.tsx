import React, { useState } from 'react';
import headphoneIcon from '../../assets/headphone.png';
import { Apis } from '../../api';
import { message } from 'antd';

const SignUpModal = ({ onClose }: { onClose?: () => void }) => {
  const [visible, setVisible] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', username: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<any>({});

  function validate() {
    const newErrors: any = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignUp(e?: React.FormEvent) {
    e?.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const payload: any = {
        name: form.name,
        email: form.email,
        password: form.password,
      };
      // Only include username if the user explicitly provided one
      if (form.username && form.username.trim()) payload.username = form.username.trim();

      const result = await Apis.user.signup(payload);
      const createdUser = result?.data;
      if (!createdUser) throw new Error('Unexpected signup response');
      // store normalized user (API sets role)
      localStorage.setItem('userLogin', JSON.stringify(createdUser));
      setVisible(false);
      onClose?.();
      message.success(result.message || 'Registered');
      // delay navigation so message is visible
      setTimeout(() => {
        window.location.href = '/';
      }, 700);
    } catch (err: any) {
      const msg = err?.message || (err && err.toString()) || 'Signup failed';
      message.error(msg);
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      {/* Modal Container - Responsive: Desktop 1280x608, Tablet 698x532, Mobile 334x500 */}
      <div className="relative bg-linear-to-br from-cyan-400 to-cyan-500 rounded-3xl shadow-2xl w-full h-auto max-w-83.5 max-h-125 md:max-w-174.5 md:max-h-133 lg:max-w-7xl lg:max-h-152">
        {/* Close Button */}
        <button onClick={() => { setVisible(false); onClose?.(); }} className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white hover:text-gray-200 transition-colors z-10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between p-6 md:p-8 lg:p-16 gap-6 lg:gap-8 h-full">
          {/* Left Side - Headphones Icon (Desktop only) */}
          <div className="shrink-0 hidden lg:block">
            <img
              src={headphoneIcon}
              alt="Headphones with music note"
              className="w-48 h-48 lg:w-64 lg:h-64 object-contain"
            />
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 w-full max-w-md">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6 lg:mb-8">
              Register / Sign Up
            </h2>

            <form onSubmit={handleSignUp} className="space-y-4 md:space-y-5">
              {/* Name Input */}
              <div className="relative">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter Your Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-3.5 pr-12 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                {errors.name && <div className="text-red-500 text-xs mt-2">{errors.name}</div>}
              </div>

              {/* Email Input */}
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Your Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-3.5 pr-12 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <path d="m3 7 9 6 9-6"></path>
                </svg>
                {errors.email && <div className="text-red-500 text-xs mt-2">{errors.email}</div>}
              </div>

              {/* Username Input (optional) */}
              <div className="relative">
                <input
                  name="username"
                  type="text"
                  placeholder="Choose a username (optional)"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-3.5 pr-12 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-3.5 pr-12 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                {errors.password && <div className="text-red-500 text-xs mt-2">{errors.password}</div>}
              </div>

              {/* Confirm Password Input */}
              <div className="relative">
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-3.5 pr-12 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="11" width="14" height="10" rx="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                {errors.confirmPassword && <div className="text-red-500 text-xs mt-2">{errors.confirmPassword}</div>}
              </div>

              {/* Register Button */}
              <button type="submit" className="w-full py-3 md:py-3.5 mt-4 md:mt-6 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-cyan-500 transition-all duration-300">
                Register Now
              </button>

              {/* Login Link */}
              <p className="text-center text-white text-xs md:text-sm mt-3 md:mt-4">
                Already Have An Account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible(false);
                    onClose?.();
                    window.dispatchEvent(new CustomEvent('open-signin'));
                  }}
                  className="font-semibold underline hover:text-gray-100 transition-colors"
                >
                  Login Here
                </a>
              </p>
            </form>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default SignUpModal;