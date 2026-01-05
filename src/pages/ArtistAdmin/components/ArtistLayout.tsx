import React from 'react';
import Sidebar from '../components/ArtistSidebar';
import Header from '../components/ArtistHeader';

interface ArtistLayoutProps {
  children: React.ReactNode;
}

const ArtistLayout: React.FC<ArtistLayoutProps> = ({ children }) => {
  return (
    <div className="bg-[#191022] min-h-screen flex overflow-hidden font-sans text-white">
      
      <Sidebar />

      <main className="flex-1 ml-72 flex flex-col h-screen overflow-hidden relative">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-8 pb-20">
            {children}
        </div>
      </main>
    </div>
  );
};

export default ArtistLayout;