import { useRef } from "react";
import type { AlbumWithStats } from "../../types/music.extended";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AlbumCard from "./AlbumCard";
import SectionHeader from "./SectionHeader";

interface Props {
    albums: AlbumWithStats[];
}

export default function FeaturedAlbums({ albums }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 200 * 3; // Scroll 3 items
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative group">
            <SectionHeader title="Featured Albums" />

            {/* Navigation Buttons */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cyan-500"
            >
                <ChevronRight size={24} />
            </button>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>
        </div>
    );
}