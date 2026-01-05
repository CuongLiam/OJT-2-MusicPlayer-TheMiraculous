import React from 'react';
import { X, LogOut, AlertTriangle } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#2a2136] border border-[#3c314b] rounded-2xl shadow-2xl transform transition-all scale-100">
        <div className="absolute top-4 right-4">
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
            <LogOut size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Sign Out</h3>
          <p className="text-gray-400 mb-8">
            Are you sure you want to sign out? You will need to enter your credentials to access your account again.
          </p>
          <div className="flex gap-4 w-full">
            <button 
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-[#3c314b] text-gray-300 font-bold hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-900/20 transition-all flex items-center justify-center gap-2"
            >
              Yes, Sign Out
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LogoutModal;