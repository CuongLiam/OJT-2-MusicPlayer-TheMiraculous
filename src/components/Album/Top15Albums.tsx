import { MoreHorizontal } from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  duration: string;
}

const TOP_15_DATA: Song[] = [
  { id: 1, title: "Until I Met You", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Walking Promises", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?q=80&w=200&auto=format&fit=crop" },
  { id: 3, title: "Gimme Some Courage", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=200&auto=format&fit=crop" },
  { id: 4, title: "Desired Games", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { id: 5, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=200&auto=format&fit=crop" },
  { id: 6, title: "Walking Promises", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop" },
  { id: 7, title: "Endless Things", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=200&auto=format&fit=crop" },
  { id: 8, title: "Dream Your Moments", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { id: 9, title: "Until I Met You", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
  { id: 10, title: "Gimme Some Courage", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
  { id: 11, title: "Dark Alley Acoustic", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=200&auto=format&fit=crop" },
  { id: 12, title: "The Heartbeat Stops", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { id: 13, title: "One More Stranger", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" },
  { id: 14, title: "Walking Promises", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { id: 15, title: "Endless Things", artist: "Ava Cornish", duration: "5:10", image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=200&auto=format&fit=crop" },
];

const Top15Albums = () => {
  const renderItem = (item: Song, index: number) => {
    const rank = item.id < 10 ? `0${item.id}` : item.id;
    return (
      <div key={item.id} className="flex items-center gap-4 py-3 border-b border-white/5 hover:bg-white/5 px-2 rounded-lg transition-colors group cursor-pointer">
        <span className="text-xl font-bold text-gray-400 font-mono w-8">
          {rank}
        </span>
        <div className="w-12.5 h-12.5 shrink-0 rounded-md overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <h4 className="text-white font-bold text-sm truncate group-hover:text-[#3BC8E7] transition-colors">
            {item.title}
          </h4>
          <p className="text-gray-500 text-xs truncate">
            {item.artist}
          </p>
        </div>
        <span className="text-gray-400 text-xs font-medium">
          {item.duration}
        </span>
        <button className="text-gray-500 hover:text-white transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
    );
  };
  const col1 = TOP_15_DATA.slice(0, 5);
  const col2 = TOP_15_DATA.slice(5, 10);
  const col3 = TOP_15_DATA.slice(10, 15);
  return (
    <section className="w-full max-w-362.5 mx-auto mt-12 mb-10">
      <div className="flex flex-col gap-1 mb-6 px-2 xl:px-16">
        <h2 className="text-xl md:text-2xl font-bold text-[#3BC8E7] tracking-wide">
          Top 15 Albums
        </h2>
        <div className="h-0.75 w-12 bg-[#3BC8E7] rounded-full mt-1"></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-4 px-2 xl:px-16">
        <div className="flex flex-col">
          {col1.map((item, index) => renderItem(item, index))}
        </div>
        <div className="flex flex-col">
          {col2.map((item, index) => renderItem(item, index))}
        </div>
        <div className="flex flex-col">
          {col3.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </section>
  );
};
export default Top15Albums;