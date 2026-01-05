import React, { useEffect, useState, useRef } from 'react';
import { uploadToCloudinary } from '../../../api/core/cloudinary.api'; 
import ArtistLayout from '../components/ArtistLayout';
import { User } from '../../../types/music.types';
import { 
  Camera, Save, User as UserIcon, Mail, FileText, CheckCircle, Loader2, AlertCircle 
} from 'lucide-react';

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    profile_image: "",
    username: ""
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("artist_user");
      const localData: User | null = storedUser ? JSON.parse(storedUser) : null;
      
      if (localData?.id) {
        try {
          // Gọi API lấy dữ liệu mới nhất từ DB
          const res = await fetch(`http://localhost:3000/users/${localData.id}`);
          const user = await res.json();
          
          setFormData({
            id: user.id,
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            email: user.email || "",
            bio: user.bio || "",
            profile_image: user.profile_image || user.avatar || "", // Fallback
            username: user.username
          });
        } catch (error) {
          console.error("Lỗi tải thông tin user", error);
        }
      }
    };

    fetchUserData();
  }, []);


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg("Please select only image files (JPG, PNG, ...).");
      return;
    }

    setIsUploading(true);
    setErrorMsg("");

    try {
      const data = await uploadToCloudinary(file, 'image');
      
      // Update state để hiển thị ngay lập tức (Preview)
      setFormData(prev => ({
        ...prev,
        profile_image: data.secure_url
      }));

      setSuccessMsg("Image uploaded successfully! Click 'Save changes' to complete the process.");
    } catch (error) {
      console.error(error);
      setErrorMsg("Error uploading image to Cloudinary.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch(`http://localhost:3000/users/${formData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          bio: formData.bio,
          profile_image: formData.profile_image,
          updated_at: new Date().toISOString()
        })
      });

      if (!res.ok) throw new Error("Error saving data");
      const updatedUser = await res.json();

      const storedUser = localStorage.getItem("artist_user");
      const oldLocalData = storedUser ? JSON.parse(storedUser) : {};
      
      const newLocalData = {
        ...oldLocalData,
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        profile_image: updatedUser.profile_image,
        fullName: `${updatedUser.last_name} ${updatedUser.first_name}`.trim()
      };
      
      localStorage.setItem("artist_user", JSON.stringify(newLocalData));

      setSuccessMsg("Information updated successfully!");
      
    } catch (error) {
      setErrorMsg("Unable to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fullName = `${formData.last_name} ${formData.first_name}`.trim();

  return (
    <ArtistLayout>
      <div className="max-w-5xl mx-auto flex flex-col gap-8 pb-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-[#3c314b] pb-6">
          <h2 className="text-3xl font-bold text-white">Account Setting</h2>
          <p className="text-gray-400">Manage your profile information and displayed images.</p>
        </div>

        {/* Thông báo */}
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <CheckCircle size={20} /> {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle size={20} /> {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="bg-[#2a2136] rounded-2xl border border-[#3c314b] p-6 flex flex-col items-center text-center h-full">
              <div className="relative group mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#3c314b] shadow-2xl relative">
                  <img 
                    src={formData.profile_image || `https://ui-avatars.com/api/?name=${fullName}&background=8c2bee&color=fff`} 
                    alt="Profile" 
                    className={`w-full h-full object-cover transition-opacity ${isUploading ? 'opacity-50' : ''}`}
                  />
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="animate-spin text-white" size={32} />
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="absolute bottom-2 right-2 p-3 bg-[#8c2bee] hover:bg-[#7b24d3] text-white rounded-full shadow-lg border-2 border-[#2a2136] transition-all hover:scale-110 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  title="Change profile picture"
                >
                  <Camera size={20} />
                </button>
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <h3 className="text-xl font-bold text-white mb-1">{fullName || "Artist Name"}</h3>
              <p className="text-gray-400 text-sm mb-6">{formData.email}</p>

              <div className="w-full bg-[#191022] p-4 rounded-xl border border-[#3c314b]">
                <p className="text-xs text-gray-500 uppercase font-bold mb-2">ACCOUNT STATUS</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  Active Artist
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="bg-[#2a2136] rounded-2xl border border-[#3c314b] p-8">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <UserIcon size={20} className="text-[#8c2bee]" /> 
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#191022] border border-[#3c314b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8c2bee]/50 transition-all"
                    value={formData.last_name}
                    onChange={e => setFormData({...formData, last_name: e.target.value})}
                    placeholder="Nguyen"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-[#191022] border border-[#3c314b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8c2bee]/50 transition-all"
                    value={formData.first_name}
                    onChange={e => setFormData({...formData, first_name: e.target.value})}
                    placeholder="Van A"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Mail size={14} /> Email
                </label>
                <input 
                  type="email" 
                  className="w-full bg-[#191022]/50 border border-[#3c314b] rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed focus:outline-none"
                  value={formData.email}
                  readOnly
                  title="Can not change email"
                />
                <p className="text-xs text-gray-500">*Email address cannot be changed. Please contact the administrator if you need assistance.</p>
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <FileText size={14} /> Bio
                </label>
                <textarea 
                  className="w-full bg-[#191022] border border-[#3c314b] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#8c2bee]/50 transition-all min-h-30"
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                  placeholder="Tell me a little about yourself and your music...."
                />
              </div>

              <div className="flex items-center justify-end gap-4 border-t border-[#3c314b] pt-6">
                <button 
                  type="button" 
                  className="px-6 py-2.5 rounded-lg text-gray-400 hover:text-white font-bold hover:bg-white/5 transition-colors"
                  onClick={() => window.location.reload()} // Nút hủy, reload lại data cũ
                >
                  Cancel
                </button>
                
                <button 
                  type="submit" 
                  disabled={isLoading || isUploading}
                  className="px-6 py-2.5 bg-[#8c2bee] hover:bg-[#7b24d3] text-white rounded-lg font-bold shadow-lg shadow-purple-900/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  {isLoading ? (
                    <> <Loader2 size={18} className="animate-spin" /> Saving... </>
                  ) : (
                    <> <Save size={18} /> Save changes </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
};

export default Settings;