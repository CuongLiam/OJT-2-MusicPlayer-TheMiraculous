import React, { useState } from 'react';
import headphoneIcon from '../../assets/headphone.png';
import { Apis } from '../../api';
import { message } from 'antd';

const SignInModal = ({ onClose }: { onClose?: () => void }) => {
  const [visible, setVisible] = useState(true);
  const [form, setForm] = useState({ emailOrUserName: '', password: '' });
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ emailOrUserName?: string; password?: string }>({});

  function validate() {
    const newErrors: { emailOrUserName?: string; password?: string } = {};
    if (!form.emailOrUserName.trim()) newErrors.emailOrUserName = 'Email or username is required';
    if (!form.password) newErrors.password = 'Password is required';
    return newErrors;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSignIn(e?: React.FormEvent) {
  e?.preventDefault();
  const newErrors = validate();
  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  try {
    const result = await Apis.user.signin({
      emailOrUserName: form.emailOrUserName,
      password: form.password,
    });

    // result shape may vary: sometimes API returns { data: { user, accessToken } } or { data: user }
    const payload = result?.data ?? result;
    let userRecord = payload?.user ?? payload;

    if (!userRecord) throw new Error('Unexpected signin response');

    // Normalize roles -> ensure userRecord.roles is an array of ROLE_* strings
    if (!Array.isArray(userRecord.roles)) {
      if (typeof userRecord.role === 'string') {
        const r = userRecord.role.trim();
        userRecord.roles = r.startsWith('ROLE_') ? [r] : [`ROLE_${r.toUpperCase()}`];
      } else if (typeof userRecord.roleName === 'string') {
        const r = userRecord.roleName.trim();
        userRecord.roles = r.startsWith('ROLE_') ? [r] : [`ROLE_${r.toUpperCase()}`];
      } else {
        // default to ROLE_USER if nothing provided
        userRecord.roles = ['ROLE_USER'];
      }
    }

    // persist user
    if (remember) {
      localStorage.setItem('userLogin', JSON.stringify(userRecord));
      sessionStorage.removeItem('userLogin');
    } else {
      sessionStorage.setItem('userLogin', JSON.stringify(userRecord));
      localStorage.removeItem('userLogin');
    }

    // close modal and give feedback
    setVisible(false);
    onClose?.();
    message.success(result?.message || 'Logged in');

    // Redirect based on roles (only admins go to /admin)
    const roles = userRecord.roles || [];
    const isAdmin = roles.includes('ROLE_ADMIN');
    // small delay so message shows briefly
    setTimeout(() => {
      if (isAdmin) {
        window.location.href = '/admin';
      } else {
        window.location.href = '/';
      }
    }, 700);
  } catch (err: any) {
    const msg = err?.message || (err && err.toString()) || 'Signin failed';
    message.error(msg);
  }
}


  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="relative bg-linear-to-br from-cyan-400 to-cyan-500 rounded-3xl shadow-2xl w-full h-auto max-w-83.5 max-h-104 md:max-w-174.5 md:max-h-115 lg:max-w-7xl lg:max-h-152">
        <button onClick={() => { setVisible(false); onClose?.(); }} className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white hover:text-gray-200 transition-colors z-10">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center justify-between p-6 md:p-8 lg:p-16 gap-6 lg:gap-8 h-full">
          <div className="shrink-0 hidden lg:block">
            <img
              src={headphoneIcon}
              alt="Headphones with music note"
              className="w-111.5 h-111.5 lg:w-64 lg:h-64 object-contain"
            />
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 w-full max-w-md">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-6 lg:mb-8">
              Login / Sign In
            </h2>

            <form onSubmit={handleSignIn} className="space-y-4 md:space-y-5">
              {/* Email Input */}
              <div className="relative">
                <input
                  name="emailOrUserName"
                  type="text"
                  placeholder="Enter Your Email or Username"
                  value={form.emailOrUserName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 md:py-3.5 pr-12 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                />
                <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                  <path d="m3 7 9 6 9-6"></path>
                </svg>
                {errors.emailOrUserName && <div className="text-red-500 text-xs mt-2">{errors.emailOrUserName}</div>}
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

              {/* Keep Me Signed In & Forgot Password */}
              <div className="flex items-center justify-between text-white text-xs md:text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                      className="w-4 h-4 rounded border-2 border-white bg-transparent checked:bg-white checked:border-white"
                    />
                    <span>Keep Me Signed In</span>
                </label>
                <a href="#" className="font-semibold hover:text-gray-100 transition-colors">
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button type="submit" className="w-full py-3 md:py-3.5 mt-4 md:mt-6 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-cyan-500 transition-all duration-300">
                Sign In
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-white text-xs md:text-sm mt-3 md:mt-4">
                Don't Have An Account?{' '}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setVisible(false);
                    onClose?.();
                    window.dispatchEvent(new CustomEvent('open-signup'));
                  }}
                  className="font-semibold underline hover:text-gray-100 transition-colors"
                >
                  Register Here
                </a>
              </p>
            </form>
          </div>
        </div>

   
      </div>
    </div>
  );
};

export default SignInModal;