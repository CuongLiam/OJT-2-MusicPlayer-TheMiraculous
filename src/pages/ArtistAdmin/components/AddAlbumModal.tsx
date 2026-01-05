import React, { useState, useRef, useEffect } from 'react';
import { X, Check, AlertCircle, Image as ImageIcon, UploadCloud, Loader2, Type, Calendar } from 'lucide-react';
import { uploadToCloudinary } from '../../../api/core/cloudinary.api';
import { Album } from '../../../types/music.types';

interface AddAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (albumData: any) => Promise<void>;
  artistId: number | string;
  initialData?: Album | null;
}

const AddAlbumModal: React.FC<AddAlbumModalProps> = ({ isOpen, onClose, onSave, artistId, initialData }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [albumInfo, setAlbumInfo] = useState({
    title: "",
    type: "FREE",
  });

  const [errors, setErrors] = useState<{title?: string; file?: string}>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!initialData;

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setGeneralError(null);
      if (initialData) {
        setAlbumInfo({ title: initialData.title, type: initialData.type || "FREE" });
        setPreviewUrl(initialData.cover_image);
        setSelectedFile(null);
      } else {
        setAlbumInfo({ title: "", type: "FREE" });
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    }
  }, [isOpen, initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setGeneralError("Please select only image files.");
      return;
    }
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, file: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: any = {};
    if (!albumInfo.title.trim()) newErrors.title = "Please enter the album name.";
    if (!isEditMode && !selectedFile) newErrors.file = "Please select a cover image.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setGeneralError(null);

    try {
      let finalCoverUrl = initialData?.cover_image || "";

      if (selectedFile) {
        const cloudRes = await uploadToCloudinary(selectedFile, 'image');
        finalCoverUrl = cloudRes.secure_url;
      }

      const albumData = {
        title: albumInfo.title,
        artist_id: Number(artistId),
        cover_image: finalCoverUrl,
        type: albumInfo.type,
        release_date: initialData?.release_date || new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      };

      await onSave(albumData);
      onClose();
    } catch (error: any) {
      setGeneralError(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#2a2136] border border-[#3c314b] rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-[#3c314b] flex justify-between items-center">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <ImageIcon className="text-[#8c2bee]" size={20} /> {isEditMode ? "Edit Album" : "Create new Album"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {generalError && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
              <AlertCircle size={20} /> <span className="text-sm">{generalError}</span>
            </div>
          )}

          <form id="album-form" onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300">Cover image (*)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative aspect-square max-w-45 mx-auto border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all ${
                  errors.file ? 'border-red-500 bg-red-500/5' : 'border-[#3c314b] hover:border-[#8c2bee]'
                }`}
              >
                {previewUrl ? (
                  <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center gap-2"><UploadCloud size={32} /><span className="text-xs">Choose image</span></div>
                )}
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
              {errors.file && <p className="text-red-500 text-xs text-center">{errors.file}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Title (*)</label>
              <input 
                type="text" 
                className={`w-full bg-[#191022] border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-500/20' : 'border-[#3c314b] focus:ring-[#8c2bee]/50'}`}
                placeholder="Album name..."
                value={albumInfo.title}
                onChange={e => {setAlbumInfo({...albumInfo, title: e.target.value}); setErrors({...errors, title: undefined})}}
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Type</label>
                <select className="w-full bg-[#191022] border border-[#3c314b] rounded-lg px-4 py-3 text-white" value={albumInfo.type} onChange={e => setAlbumInfo({...albumInfo, type: e.target.value})}>
                  <option value="FREE">FREE</option>
                  <option value="PREMIUM">PREMIUM</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Date</label>
                <div className="w-full bg-[#191022]/50 border border-[#3c314b] rounded-lg px-4 py-3 text-gray-500 flex items-center gap-2">
                  <Calendar size={14} /> {isEditMode ? initialData?.release_date : new Date().toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-[#3c314b] flex justify-end gap-3 bg-[#221a2c]">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-400 font-bold hover:bg-white/5">Cancel</button>
          <button 
            type="button" onClick={(e) => handleSubmit(e as any)} disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#8c2bee] text-white rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-[#7b24d3] disabled:opacity-50"
          >
            {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <><Check size={18} /> {isEditMode ? "Update" : "Create Album"}</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAlbumModal;