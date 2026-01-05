import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Ad from "../../assets/image/Home-ad.jpg"
import {
  HomePageAPI,
  SongWithDetails,
  AlbumWithDetails,
  ArtistWithStats,
  GenreWithStats,
} from "../../api/core/home.api";

const GENRE_IMAGES: Record<string, string> = {
  Pop: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800",
  Ballad:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800",
  "Rap / Hip-hop":
    "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=800",
  "R&B":
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800",
  EDM: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800",
  Indie:
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=800",
  Rock: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800",
  Jazz: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=800",
  Bolero:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800",
  Lofi: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=800",
};

/**
 * SECTION HEADER COMPONENT
 */
const SectionHeader = ({
  title,
  showViewMore = false,
  onViewMore,
}: {
  title: string;
  showViewMore?: boolean;
  onViewMore?: () => void;
}) => (
  <div className="flex justify-between items-end mb-6 pb-2 bg-transparent">
    <div className="relative pb-2 bg-transparent">
      <h2 className="text-xl md:text-2xl font-semibold text-[#3BC8E7] tracking-wide">
        {title}
      </h2>
      <span className="absolute -bottom-2.5 left-0 w-12 h-1 bg-[#3BC8E7] rounded-full"></span>
    </div>
    {showViewMore && (
      <button
        onClick={onViewMore}
        className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer mb-2 bg-transparent"
      >
        View More
      </button>
    )}
  </div>
);

/**
 * SONG CARD - Hiển thị bài hát với album cover
 */
const SongCard = ({
  song,
  onClick,
}: {
  song: SongWithDetails;
  onClick?: () => void;
}) => (
  <div className="group cursor-pointer bg-transparent" onClick={onClick}>
    <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#3BC8E7]/50 w-[175px] h-[175px]">
      <img
        src={song.album_cover || song.artist_image}
        alt={song.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        onError={(e) => {
          e.currentTarget.src = "https://via.placeholder.com/175?text=No+Image";
        }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-[#3BC8E7] rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
    <h3 className="text-sm text-gray-200 font-medium truncate group-hover:text-[#3BC8E7] transition-colors w-[175px]">
      {song.title}
    </h3>
    <p className="text-sm text-gray-400 truncate w-[175px]">
      {song.artist_name}
    </p>
  </div>
);

/**
 * TOP SONG ROW - Dùng cho Weekly Top 15 (Vertical style với line)
 */
const TopSongRow = ({
  song,
  rank,
}: {
  song: SongWithDetails;
  rank: number;
}) => (
  <div className="group cursor-pointer">
    <div className="flex items-center gap-3 py-3 px-1 hover:bg-gray-800/30 rounded-lg transition-colors">
      {/* Rank number */}
      <span
        className={`text-xl font-bold w-10 text-center shrink-0 ${
          rank <= 3 ? "text-[#3BC8E7]" : "text-gray-400"
        }`}
      >
        {String(rank).padStart(2, "0")}
      </span>

      {/* Album cover */}
      <img
        src={song.album_cover || song.artist_image}
        alt={song.title}
        className="w-12 h-12 rounded-lg object-cover shrink-0"
      />

      {/* Song info */}
      <div className="flex-1 min-w-0 pr-2">
        <h4 className="text-sm text-white font-medium truncate group-hover:text-[#3BC8E7] transition-colors">
          {song.title}
        </h4>
        <p className="text-xs text-gray-400 truncate">{song.artist_name}</p>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-gray-400 w-12 text-right">
          {song.duration}
        </span>
        <button className="text-gray-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="6" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="18" r="1.5" />
          </svg>
        </button>
      </div>
    </div>

    {/* Bottom line */}
    <div className="h-px bg-gradient-to-r from-transparent via-gray-700/30 to-transparent mx-2"></div>
  </div>
);

/**
 * ARTIST CARD
 */
const ArtistCard = ({
  artist,
  onClick,
}: {
  artist: ArtistWithStats;
  onClick?: () => void;
}) => (
  <div className="group cursor-pointer bg-transparent" onClick={onClick}>
    <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#3BC8E7]/50 w-[175px] h-[175px]">
      <img
        src={
          artist.profile_image || "https://via.placeholder.com/175?text=Artist"
        }
        alt={`${artist.first_name} ${artist.last_name}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
    </div>
    <h3 className="text-sm text-gray-200 font-medium truncate group-hover:text-[#3BC8E7] transition-colors w-[175px]">
      {artist.first_name} {artist.last_name}
    </h3>
    <p className="text-xs text-gray-400 w-[175px]">
      {artist.song_count} bài hát
    </p>
  </div>
);

/**
 * ALBUM CARD
 */
const AlbumCard = ({
  album,
  onClick,
}: {
  album: AlbumWithDetails;
  onClick?: () => void;
}) => (
  <div className="group cursor-pointer bg-transparent" onClick={onClick}>
    <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-[#3BC8E7]/50 w-[175px] h-[175px]">
      <img
        src={album.cover_image}
        alt={album.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-[#3BC8E7] rounded-full flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
    <h3 className="text-sm text-gray-200 font-medium truncate group-hover:text-[#3BC8E7] transition-colors w-[175px]">
      {album.title}
    </h3>
    <p className="text-sm text-gray-400 truncate w-[175px]">
      {album.artist_name}
    </p>
  </div>
);

/**
 * RELEASE CARD - Timeline style
 */
const ReleaseCard = ({
  song,
  isLast,
}: {
  song: SongWithDetails;
  isLast: boolean;
}) => (
  <div className="relative flex flex-col items-start w-[297.5px]">
    <div className="relative w-full mb-7">
      <div className="w-3 h-3 rounded-full border-2 border-[#3BC8E7] bg-[#14182A] absolute left-0"></div>
      {!isLast && (
        <div className="absolute top-1.5 left-3 w-[293.5px] h-0.5 bg-gray-700"></div>
      )}
    </div>
    <div className="flex items-center gap-4 w-full">
      <img
        src={song.album_cover || song.artist_image}
        alt={song.title}
        className="w-12 h-12 rounded-lg object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm text-white font-medium truncate">
            {song.title}
          </h4>
          <span className="text-sm text-gray-400 shrink-0">
            {song.duration}
          </span>
        </div>
        <p className="text-xs text-gray-400 truncate">{song.artist_name}</p>
      </div>
    </div>
  </div>
);

/**
 * GENRE CARD
 */
const GenreCard = ({
  genre,
  onClick,
}: {
  genre: GenreWithStats;
  onClick?: () => void;
}) => (
  <div
    className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-800 h-[175px] transition-all duration-300 hover:ring-2 hover:ring-[#3BC8E7]/50"
    onClick={onClick}
  >
    <img
      src={
        GENRE_IMAGES[genre.genre_name] ||
        "https://via.placeholder.com/400?text=Genre"
      }
      alt={genre.genre_name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
    <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{genre.genre_name}</h3>
        <p className="text-xs text-gray-300">{genre.song_count} bài hát</p>
      </div>
      <button className="text-white hover:text-[#3BC8E7] transition-colors">
        <span className="text-sm">View Songs</span>
      </button>
    </div>
  </div>
);

/**
 * MAIN COMPONENT
 */
export default function HomePageInfo() {
  const navigate = useNavigate();

  // Refs cho scroll
  const recentlyPlayedRef = useRef<HTMLDivElement>(null);
  const artistsRef = useRef<HTMLDivElement>(null);
  const albumsRef = useRef<HTMLDivElement>(null);
  const releasesRef = useRef<HTMLDivElement>(null);

  // States
  const [recentlyPlayed, setRecentlyPlayed] = useState<SongWithDetails[]>([]);
  const [weeklyTop15, setWeeklyTop15] = useState<SongWithDetails[]>([]);
  const [featuredArtists, setFeaturedArtists] = useState<ArtistWithStats[]>([]);
  const [newReleases, setNewReleases] = useState<SongWithDetails[]>([]);
  const [featuredAlbums, setFeaturedAlbums] = useState<AlbumWithDetails[]>([]);
  const [topGenres, setTopGenres] = useState<GenreWithStats[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * NAVIGATION HANDLERS
   */
  const handleSongClick = (songId: string) => {
    // TODO: Navigate to song detail page (chưa có route)
    console.log("Play song:", songId);
    // navigate(`/song/${songId}`);
  };

  const handleArtistClick = (artistId: string) => {
    // Navigate to artist page with artist ID as query param
    navigate(`/artists?id=${artistId}`);
  };

  const handleAlbumClick = (albumId: string) => {
    // Navigate to album page with album ID as query param
    navigate(`/album?id=${albumId}`);
  };

  const handleGenreClick = (genreId: string, genreName: string) => {
    // Navigate to genre page with genre info
    navigate(`/genre?id=${genreId}&name=${genreName}`);
  };

  const handleViewMoreArtists = () => {
    navigate("/artists");
  };

  const handleViewMoreAlbums = () => {
    navigate("/album/featured-albums");
  };

  const handleViewMoreGenres = () => {
    navigate("/more-genres");
  };

  /**
   * FETCH ALL DATA
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lấy userId từ localStorage
        const userStr = localStorage.getItem("user");
        const userId = userStr ? JSON.parse(userStr).id : undefined;

        console.log("🔄 Fetching home page data...");

        // Fetch parallel tất cả data
        const [recently, top15, artists, releases, albums, genres] =
          await Promise.all([
            HomePageAPI.getRecentlyPlayed(userId, 6),
            HomePageAPI.getWeeklyTop15(),
            HomePageAPI.getFeaturedArtists(6),
            HomePageAPI.getNewReleases(5),
            HomePageAPI.getFeaturedAlbums(6),
            HomePageAPI.getTopGenres(),
          ]);

        console.log("✅ Data loaded successfully");

        setRecentlyPlayed(recently);
        setWeeklyTop15(top15);
        setFeaturedArtists(artists);
        setNewReleases(releases);
        setFeaturedAlbums(albums);
        setTopGenres(genres.slice(0, 6)); // Chỉ lấy 6 genres
      } catch (err) {
        console.error("❌ Error loading home page:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * SCROLL FUNCTION
   */
  const scroll = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement>
  ) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  /**
   * LOADING STATE
   */
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#14182A] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#3BC8E7] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#3BC8E7] text-xl">Đang tải...</p>
        </div>
      </div>
    );
  }

  /**
   * ERROR STATE
   */
  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#14182A] flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-xl p-8 max-w-md">
          <p className="text-red-500 text-xl text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  /**
   * MAIN RENDER
   */
  return (
    <div className="w-full bg-[#14182A]">
      <section className="relative w-full overflow-hidden mt-12">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="relative group/slider">
            <SectionHeader title="Recently Played" showViewMore={true} />

            {recentlyPlayed.length > 0 ? (
              <>
                <button
                  onClick={() => scroll("left", recentlyPlayedRef)}
                  className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right", recentlyPlayedRef)}
                  className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
                <div
                  ref={recentlyPlayedRef}
                  className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {recentlyPlayed.map((song) => (
                    <div key={song.id} className="snap-start shrink-0">
                      <SongCard
                        song={song}
                        onClick={() => handleSongClick(song.id)}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 bg-gray-800/20 rounded-xl border-2 border-dashed border-gray-700">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-gray-600 mb-4"
                >
                  <path
                    d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-gray-400 text-lg font-medium mb-2">
                  Chưa có lịch sử nghe nhạc
                </p>
                <p className="text-gray-500 text-sm">
                  Hãy bắt đầu khám phá và nghe nhạc yêu thích của bạn!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="relative w-full mt-12">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader title="Weekly Top 15" />

          {/* Desktop: 3 columns */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-x-8">
            {/* Column 1: Rank 1-5 */}
            <div className="space-y-0">
              {weeklyTop15.slice(0, 5).map((song, i) => (
                <TopSongRow key={song.id} song={song} rank={i + 1} />
              ))}
            </div>

            {/* Column 2: Rank 6-10 */}
            <div className="space-y-0">
              {weeklyTop15.slice(5, 10).map((song, i) => (
                <TopSongRow key={song.id} song={song} rank={i + 6} />
              ))}
            </div>

            {/* Column 3: Rank 11-15 */}
            <div className="space-y-0">
              {weeklyTop15.slice(10, 15).map((song, i) => (
                <TopSongRow key={song.id} song={song} rank={i + 11} />
              ))}
            </div>
          </div>

          {/* Mobile/Tablet: Single column */}
          <div className="lg:hidden space-y-0">
            {weeklyTop15.map((song, i) => (
              <TopSongRow key={song.id} song={song} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden mt-12">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="relative group/slider">
            <SectionHeader
              title="Featured Artists"
              showViewMore={true}
              onViewMore={handleViewMoreArtists}
            />
            <button
              onClick={() => scroll("left", artistsRef)}
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right", artistsRef)}
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <div
              ref={artistsRef}
              className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featuredArtists.map((artist) => (
                <div key={artist.id} className="snap-start shrink-0">
                  <ArtistCard
                    artist={artist}
                    onClick={() => handleArtistClick(artist.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden mt-12">
        <div className="max-w-340 mx-auto px-6 md:px-8 lg:px-12">
          <img
            src={Ad}
            alt="Upgrade to Pro"
            className="w-full h-10.5 md:h-21.5 lg:h-37 object-contain rounded-2xl"
          />
        </div>
      </section>

      <section className="relative w-full overflow-hidden mt-12">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="relative group/slider">
            <SectionHeader title="New Releases" showViewMore={true} />
            <button
              onClick={() => scroll("left", releasesRef)}
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right", releasesRef)}
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <div
              ref={releasesRef}
              className="flex gap-0 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {newReleases.map((song, i) => (
                <div key={song.id} className="snap-start shrink-0">
                  <ReleaseCard
                    song={song}
                    isLast={i === newReleases.length - 1}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full overflow-hidden mt-12">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 lg:px-12">
          <div className="relative group/slider">
            <SectionHeader
              title="Featured Albums"
              showViewMore={true}
              onViewMore={handleViewMoreAlbums}
            />
            <button
              onClick={() => scroll("left", albumsRef)}
              className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right", albumsRef)}
              className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-[#3BC8E7] rounded-full text-white shadow-xl opacity-0 group-hover/slider:opacity-100 transition-all"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
            <div
              ref={albumsRef}
              className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {featuredAlbums.map((album) => (
                <div key={album.id} className="snap-start shrink-0">
                  <AlbumCard
                    album={album}
                    onClick={() => handleAlbumClick(album.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full mt-12 mb-20">
        <div className="max-w-[1360px] mx-auto px-6 md:px-8 lg:px-12">
          <SectionHeader
            title="Top Genres"
            showViewMore={true}
            onViewMore={handleViewMoreGenres}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topGenres.map((genre) => (
              <GenreCard
                key={genre.id}
                genre={genre}
                onClick={() => handleGenreClick(genre.id, genre.genre_name)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
