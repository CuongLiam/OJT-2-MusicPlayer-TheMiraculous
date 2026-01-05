import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Check, AlertCircle, Music, UploadCloud, Loader2, Disc, Tag, Clock 
} from 'lucide-react';
import { Album, Song } from '../../../types/music.types';
import { uploadToCloudinary } from '../../../api/core/cloudinary.api';

interface Genre {
  id: string;
  genre_name: string;
}

interface AddSongModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (songData: any) => Promise<void>;
  albums: Album[];
  artistId: number | string;
  initialData?: Song | null;
}

interface FormErrors {
  title?: string;
  genre?: string;
  file?: string;
  album?: string;
}

const AddSongModal: React.FC<AddSongModalProps> = ({ 
  isOpen, onClose, onSave, albums, artistId, initialData 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [genresList, setGenresList] = useState<Genre[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [newSong, setNewSong] = useState({
    title: "",
    genre_ids: [] as number[],
    album_id: "",
    duration: "",
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditMode = !!initialData;

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setGeneralError(null);
      const fetchGenres = async () => {
        try {
          const res = await fetch("http://localhost:3000/genres");
          const data = await res.json();
          setGenresList(data);
        } catch (error) { console.error(error); }
      };
      fetchGenres();

      if (initialData) {
        setNewSong({
          title: initialData.title,
          genre_ids: initialData.genre_ids || [],
          album_id: initialData.album_id ? String(initialData.album_id) : "",
          duration: initialData.duration || "--:--"
        });
        setSelectedFile(null);
      } else {
        setNewSong({ title: "", genre_ids: [], album_id: "", duration: "" });
        setSelectedFile(null);
      }
    }
  }, [isOpen, initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    if (!newSong.title.trim()) { newErrors.title = "Please enter the song title."; isValid = false; }
    if (newSong.genre_ids.length === 0) { newErrors.genre = "Please select at least one category."; isValid = false; }
    if (!newSong.album_id) { newErrors.album = "Please select an album."; isValid = false; }
    if (!isEditMode && !selectedFile) { newErrors.file = "Please upload the music file."; isValid = false; }
    setErrors(newErrors);
    return isValid;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('audio/')) { setGeneralError("Please select only the music file."); return; }
    setErrors(prev => ({ ...prev, file: undefined }));
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    audio.onloadedmetadata = () => {
      const min = Math.floor(audio.duration / 60);
      const sec = Math.floor(audio.duration % 60);
      setNewSong(prev => ({ ...prev, duration: `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}` }));
      URL.revokeObjectURL(audio.src);
    };
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setGeneralError(null);

    try {
      let finalFileUrl = initialData?.file_url || "";

      if (selectedFile) {
        const cloudRes = await uploadToCloudinary(selectedFile, 'video');
        finalFileUrl = cloudRes.secure_url;
      }

      const songData = {
        title: newSong.title,
        artist_id: Number(artistId),
        album_id: Number(newSong.album_id),
        genre_ids: newSong.genre_ids,
        file_url: finalFileUrl,
        duration: newSong.duration,
        views: initialData?.views || 0,
        created_at: initialData?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await onSave(songData);
      onClose();
    } catch (error: any) {
      setGeneralError(error.message || "Error uploading music to Cloudinary.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getGenreName = (id: number) => genresList.find(g => Number(g.id) === id)?.genre_name || "Unknown";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-[#2a2136] border border-[#3c314b] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-[#3c314b] flex justify-between items-center">
          <h3 className="text-xl font-bold text-white flex items-center gap-2"><Music className="text-[#8c2bee]" /> {isEditMode ? "Update song" : "Add new song"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={24} /></button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {generalError && <div className="mb-6 p-4 rounded-xl border bg-red-500/10 border-red-500/20 text-red-400 flex items-center gap-3"><AlertCircle size={20} /><span>{generalError}</span></div>}
          <form id="add-song-form" onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-300">Audio files{isEditMode ? "(Select to change)" : "(*)"}</label>
              <div onClick={() => fileInputRef.current?.click()} className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${errors.file ? 'border-red-500 bg-red-500/5' : selectedFile ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-[#3c314b] hover:border-[#8c2bee]'}`}>
                {selectedFile ? <div className="text-emerald-500 flex flex-col items-center"><Check size={32} /><span className="text-sm font-bold">{selectedFile.name}</span></div> : <div className="text-gray-400 flex flex-col items-center"><UploadCloud size={32} /><span className="text-sm">Click to select music (MP3, WAV)</span></div>}
                <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={handleFileChange} />
              </div>
              {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Title (*)</label>
                <input type="text" className={`w-full bg-[#191022] border rounded-lg px-4 py-3 text-white focus:outline-none ${errors.title ? 'border-red-500' : 'border-[#3c314b]'}`} value={newSong.title} onChange={e => {setNewSong({...newSong, title: e.target.value}); setErrors({...errors, title: undefined})}} />
                {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Genre (*)</label>
                <select className={`w-full bg-[#191022] border rounded-lg px-4 py-3 text-white appearance-none ${errors.genre ? 'border-red-500' : 'border-[#3c314b]'}`} onChange={e => { const id = Number(e.target.value); if(id && !newSong.genre_ids.includes(id)) setNewSong({...newSong, genre_ids: [...newSong.genre_ids, id]}); setErrors({...errors, genre: undefined}); e.target.value = ""}} defaultValue=""><option value="" disabled>-- Choose genre --</option>{genresList.map(g => <option key={g.id} value={g.id}>{g.genre_name}</option>)}</select>
                <div className="flex flex-wrap gap-2 pt-2">{newSong.genre_ids.map(id => <span key={id} className="bg-[#8c2bee]/20 text-[#8c2bee] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">{getGenreName(id)}<button type="button" onClick={() => setNewSong({...newSong, genre_ids: newSong.genre_ids.filter(i => i !== id)})}><X size={12}/></button></span>)}</div>
                {errors.genre && <p className="text-red-500 text-xs">{errors.genre}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Album (*)</label>
                <select className={`w-full bg-[#191022] border rounded-lg px-4 py-3 text-white ${errors.album ? 'border-red-500' : 'border-[#3c314b]'}`} value={newSong.album_id} onChange={e => {setNewSong({...newSong, album_id: e.target.value}); setErrors({...errors, album: undefined})}}><option value="" disabled>-- Choose album --</option>{albums.map(alb => <option key={alb.id} value={alb.id}>{alb.title}</option>)}</select>
                {errors.album && <p className="text-red-500 text-xs">{errors.album}</p>}
              </div>
              <div className="space-y-2"><label className="text-sm font-medium text-gray-300">Duration</label><input type="text" readOnly className="w-full bg-[#191022]/50 border border-[#3c314b] rounded-lg px-4 py-3 text-gray-400" value={newSong.duration} /></div>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-[#3c314b] flex justify-end gap-3 bg-[#221a2c] rounded-b-2xl">
          <button onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-400 font-bold hover:bg-white/5">Cancel</button>
          <button type="button" onClick={(e) => handleSubmit(e as any)} disabled={isSubmitting} className="px-6 py-2.5 bg-[#8c2bee] text-white rounded-xl font-bold shadow-lg flex items-center gap-2">
            {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : <><Check size={18} /> {isEditMode ? "Update" : "Save song"}</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSongModal;