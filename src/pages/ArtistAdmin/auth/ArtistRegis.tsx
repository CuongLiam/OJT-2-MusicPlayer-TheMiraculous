import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Music, Check, CheckCircle } from "lucide-react";

const ArtistRegister = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength = useMemo(() => {
    const len = password.length;
    if (len === 0) return 0;
    if (len < 4) return 1; 
    if (len < 6) return 2; 
    if (len < 8) return 3; 
    if (len >= 8) return 4;            
    return 0; 
  }, [password]);

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 1: return "bg-red-500";
      case 2: return "bg-orange-500";
      case 3: return "bg-yellow-500";
      case 4: return "bg-emerald-500";
      default: return "bg-slate-200 dark:bg-[#473b54]";
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please fill in all the information.");
      setIsLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Email is not in the correct format.");
      setIsLoading(false);
      return;
    }

    if (passwordStrength < 4) {
      setError("The password is not strong enough (minimum 8 characters).");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("The verification password does not match.");
      setIsLoading(false);
      return;
    }

    if (!agreeTerms) {
      setError("You need to agree to the terms of service.");
      setIsLoading(false);
      return;
    }

    try {
      const checkRes = await fetch(`http://localhost:3000/users?email=${email}`);
      const existingUsers = await checkRes.json();

      if (existingUsers.length > 0) {
        setError("Email này đã được sử dụng.");
        setIsLoading(false);
        return;
      }

      const newUser = {
        username: email.split('@')[0],
        email: email,
        password: password,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        roles: ["ROLE_ARTIST"],
        profile_image: `https://res.cloudinary.com/douhnxire/image/upload/v1767600780/rrjfaswq8qc43xobuzer.png`, 
        bio: "New Artist",
        status: "ACTIVE",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const registerRes = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!registerRes.ok) throw new Error("Failed");

      setIsLoading(false);
      setSuccess(true);

      setTimeout(() => {
        navigate("/artist/login");
      }, 2000);

    } catch (err) {
      setError("Server connection error.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f6f8] dark:bg-[#191022] font-sans text-slate-900 dark:text-white antialiased transition-colors duration-300 flex relative">
      
      {success && (
        <div className="fixed top-5 right-5 z-50 animate-bounce-in">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 border border-emerald-400">
            <div className="bg-white/20 p-1.5 rounded-full">
               <CheckCircle size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Registration successful!</h4>
              <p className="text-emerald-100 text-sm">Changing direction...</p>
            </div>
          </div>
        </div>
      )}

      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between bg-[#141118] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-overlay transition-opacity duration-700 hover:opacity-70"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop')",
          }}
        ></div>
        <div className="absolute inset-0 bg-linear-to-t from-[#191022] via-[#8c2bee]/20 to-transparent"></div>

        <div className="relative z-10 p-12 flex flex-col h-full justify-between">
          <div className="flex items-center gap-3 text-white">
            <div className="size-8 text-[#8c2bee]">
              <Music size={32} />
            </div>
            <span className="text-xl font-bold tracking-tight">The Miraculous</span>
          </div>

          <div className="max-w-md">
            <blockquote className="text-2xl font-bold leading-tight mb-4 text-white">
              "Start your musical journey today."
            </blockquote>
            <p className="text-[#ab9db9] text-base font-medium">
              Join the professional artist community.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 lg:p-10 relative bg-[#f7f6f8] dark:bg-[#191022] overflow-y-auto">
        
        <div className="w-full max-w-120 flex flex-col gap-6 py-10 lg:py-0">
          <div className="flex flex-col gap-2 pb-2">
            <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight">
              Register an account
            </h1>
            <p className="text-slate-500 dark:text-[#ab9db9] text-base">
              Create a new artist account to manage your music.
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            
            <div className="flex gap-4">
              <label className="flex-1 flex flex-col gap-2">
                <span className="text-slate-700 dark:text-white text-sm font-medium">First Name</span>
                <input
                  disabled={success}
                  className="w-full rounded-lg border border-slate-200 dark:border-[#473b54] bg-white dark:bg-[#211c27] text-slate-900 dark:text-white h-12 px-3 focus:ring-2 focus:ring-[#8c2bee]/50 outline-none transition-all disabled:opacity-50"
                  placeholder="Nguyen"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              
              <label className="flex-1 flex flex-col gap-2">
                <span className="text-slate-700 dark:text-white text-sm font-medium">Last Name</span>
                <input
                  disabled={success}
                  className="w-full rounded-lg border border-slate-200 dark:border-[#473b54] bg-white dark:bg-[#211c27] text-slate-900 dark:text-white h-12 px-3 focus:ring-2 focus:ring-[#8c2bee]/50 outline-none transition-all disabled:opacity-50"
                  placeholder="Van A"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-slate-700 dark:text-white text-sm font-medium">Email</span>
              <input
                disabled={success}
                className="w-full rounded-lg border border-slate-200 dark:border-[#473b54] bg-white dark:bg-[#211c27] text-slate-900 dark:text-white h-12 px-3 focus:ring-2 focus:ring-[#8c2bee]/50 outline-none transition-all disabled:opacity-50"
                placeholder="artist@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-slate-700 dark:text-white text-sm font-medium">Password</span>
              <div className="relative flex w-full flex-1 items-stretch rounded-lg">
                <input
                  disabled={success}
                  className="w-full rounded-lg rounded-r-none border-r-0 border border-slate-200 dark:border-[#473b54] bg-white dark:bg-[#211c27] text-slate-900 dark:text-white h-12 px-3 focus:ring-0 outline-none transition-all disabled:opacity-50"
                  placeholder="********"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  onClick={() => !success && setShowPassword(!showPassword)}
                  className="flex border border-l-0 border-slate-200 dark:border-[#473b54] bg-white dark:bg-[#211c27] items-center justify-center pr-3 rounded-r-lg cursor-pointer text-slate-400 dark:text-[#ab9db9] hover:text-[#8c2bee]"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
              </div>
              
              <div className="flex gap-2 mt-1 h-1.5 w-full">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-full flex-1 rounded-full transition-all duration-300 ${
                      passwordStrength >= level
                        ? getStrengthColor(passwordStrength)
                        : "bg-slate-200 dark:bg-[#473b54]"
                    }`}
                  ></div>
                ))}
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-slate-700 dark:text-white text-sm font-medium">Confirm password</span>
              <div className="relative flex w-full flex-1 items-stretch rounded-lg">
                <input
                  disabled={success}
                  className="w-full rounded-lg rounded-r-none border-r-0 border border-slate-200 dark:border-[#473b54] bg-white dark:bg-[#211c27] text-slate-900 dark:text-white h-12 px-3 focus:ring-0 outline-none transition-all disabled:opacity-50"
                  placeholder="********"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div
                  onClick={() => !success && setShowConfirmPassword(!showConfirmPassword)}
                  className="flex border border-l-0 border-slate-200 dark:border-[#473b54] bg-white dark:bg-[#211c27] items-center justify-center pr-3 rounded-r-lg cursor-pointer text-slate-400 dark:text-[#ab9db9] hover:text-[#8c2bee]"
                >
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 mt-1 cursor-pointer group">
                <div className="relative flex items-center">
                    <input 
                        disabled={success}
                        type="checkbox" 
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 dark:border-[#473b54] bg-white dark:bg-[#211c27] checked:bg-[#8c2bee] transition-all disabled:opacity-50"
                    />
                    <Check size={14} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" strokeWidth={3} />
                </div>
                <span className="text-slate-500 dark:text-[#ab9db9] text-sm leading-tight group-hover:text-slate-700 dark:group-hover:text-white transition-colors">
                    I agree <a className="text-[#8c2bee] hover:underline font-medium">Terms of service</a>.
                </span>
            </label>

            {error && (
              <div className="w-full bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-500 text-sm font-medium">
                  {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || success}
              className={`flex w-full cursor-pointer items-center justify-center rounded-lg h-12 font-bold text-white transition-all mt-2 shadow-lg active:scale-[0.98]
                ${success 
                  ? "bg-emerald-500 shadow-emerald-500/20 cursor-default" 
                  : "bg-[#8c2bee] hover:bg-[#7b24d3] shadow-[#8c2bee]/20"
                }
                disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Processing..." : success ? <><CheckCircle size={20} className="mr-2"/> Registered successfully</> : "Register now"}
            </button>

            <div className="flex items-center justify-center gap-2 mt-2">
              <p className="text-slate-500 dark:text-[#ab9db9] text-sm">Already have an account?</p>
              <Link to="/artist/login" className="text-[#8c2bee] hover:text-[#7b24d3] font-bold text-base hover:underline transition-all">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ArtistRegister;