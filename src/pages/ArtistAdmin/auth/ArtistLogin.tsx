import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Music, CheckCircle } from "lucide-react";
import { User } from "../../../types/music.types";

const ArtistLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please enter your full email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/users");
      const users: User[] = await res.json();
      
      const user = users.find(
        (u) =>
          (u.email === email || u.username === email) && u.password === password
      );

      if (!user) {
        setError("The login information is incorrect!");
        setIsLoading(false);
        return;
      }

      const hasAccess = user.roles.some(role => role === "ROLE_ARTIST");

      if (!hasAccess) {
        setError("This account does not belong to an artist.");
        setIsLoading(false);
        return;
      }

      if (user.status === "BLOCKED") {
        setError("Your account has been locked.");
        setIsLoading(false);
        return;
      }

      const userToSave = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        fullName: user.first_name ? `${user.last_name} ${user.first_name}` : user.username,
        email: user.email,
        roles: user.roles,
        profile_image: user.profile_image
      };

      localStorage.setItem("artist_user", JSON.stringify(userToSave));
      
      setIsLoading(false);
      setSuccess(true); 

      setTimeout(() => {
        navigate("/artist/dashboard", { replace: true });
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("Lỗi kết nối máy chủ. Vui lòng kiểm tra json-server.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f6f8] dark:bg-[#191022] font-sans text-slate-900 dark:text-white antialiased flex relative">      
      {success && (
        <div className="fixed top-5 right-5 z-50 animate-bounce-in">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 border border-emerald-400">
            <div className="bg-white/20 p-1.5 rounded-full">
               <CheckCircle size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Log in successfully!</h4>
              <p className="text-emerald-100 text-sm">Currently accessing Dashboard...</p>
            </div>
          </div>
        </div>
      )}

      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between bg-[#141118] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop')",
          }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#191022] via-[#8c2bee]/20 to-transparent"></div>

        <div className="relative z-10 p-12 flex flex-col h-full justify-between">
          <div className="flex items-center gap-3 text-white">
            <div className="p-2 bg-[#8c2bee] rounded-lg">
              <Music size={24} fill="white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              The Miraculous
            </span>
          </div>
          <div className="max-w-md">
            <h2 className="text-3xl font-bold leading-tight mb-4 text-white">
              "Welcome back, Artist!"
            </h2>
            <p className="text-[#ab9db9] text-base font-medium">
              Continue your journey of winning over audiences and managing your music.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-20 relative bg-[#f7f6f8] dark:bg-[#191022]">
        <div className="w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col gap-2 pb-2">
            <h1 className="text-slate-900 dark:text-white text-3xl font-bold">
              Login to Portal
            </h1>
            <p className="text-slate-500 dark:text-gray-400">
              Enter your artist account information.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-gray-300">Email or Username</label>
              <input
                disabled={success}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#3c314b] bg-white dark:bg-[#2a2136] text-slate-900 dark:text-white focus:ring-2 focus:ring-[#8c2bee] focus:border-transparent outline-none transition-all"
                placeholder="artist@example.com"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <input
                  disabled={success}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-[#3c314b] bg-white dark:bg-[#2a2136] text-slate-900 dark:text-white focus:ring-2 focus:ring-[#8c2bee] focus:border-transparent outline-none transition-all pr-12"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => !success && setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8c2bee] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg flex items-center gap-2">
                <CheckCircle size={16} className="rotate-45" />
                {error}
              </div>
            )}

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm font-bold text-[#8c2bee] hover:underline">
                Forgot Password ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-lg transform active:scale-[0.98]
                ${success 
                  ? "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20 cursor-default" 
                  : "bg-[#8c2bee] hover:bg-[#7b24d3] shadow-[#8c2bee]/30"
                }
                disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Checking..." : success ? "Successfully!" : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-slate-500 dark:text-gray-400 text-sm">
              You want to become an artist?{" "}
              <Link to="/artist/register" className="text-[#8c2bee] font-bold hover:underline">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistLogin;