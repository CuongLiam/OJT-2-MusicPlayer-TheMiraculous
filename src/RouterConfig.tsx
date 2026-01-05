import { Navigate, Route, Routes } from 'react-router'
import Artists from './pages/Artist/Artists'
import Home from './pages/Home/Home'
import Genre from './pages/Genre/Genre'
import MoreGenres from './pages/Genre/MoreGenres'
import Album from './pages/Album/Album'
import AllFeaturedAlbums from './pages/Album/AllFeaturedAlbums'
import AllTrendingAlbums from './pages/Album/AllTrendingAlbums'
import AllAlbumsByArtists from './pages/Album/AllAlbumsByArtists'
import Admin from './pages/Admin/Admin'
import ProtectedAdmin from './pages/Admin/auth/ProtectedAdmin'
import AdminDashboard from './pages/Admin/Dashboard'
import AdminUser from './pages/Admin/Users'
import AdminGenre from './pages/Admin/Genres'
import AdminAlbum from './pages/Admin/Albums'
import AdminSong from './pages/Admin/Songs'
import AdminBanner from './pages/Admin/Banners'
import AdminSubscription from './pages/Admin/Subscriptions'
import AdminArtists from './pages/Admin/Artists'
import SignInModal from './components/auth/SignInModal'
import SignUpModal from './components/auth/SignUpModal'
import Favourite from  './pages/Favourite/Favourite'
import TopTrack from './pages/TopTracks/TopTrack'
import AllNewReleases from './pages/Album/AllNewReleasesAlbum'
import ArtistLogin from './pages/ArtistAdmin/auth/ArtistLogin'
import ArtistRegis from './pages/ArtistAdmin/auth/ArtistRegis'
import ArtistDashboard from './pages/ArtistAdmin/components/ArtistDashboard'
import ProtectedArtistRoute from './pages/ArtistAdmin/components/ProtectedArtistRoute'
import SongManagement from './pages/ArtistAdmin/components/SongManagement'
import AlbumManagement from './pages/ArtistAdmin/components/AlbumManagement'
import Settings from './pages/ArtistAdmin/components/Settings'
import History from './pages/History/history'

export default function RouterConfig() {
  return (
    <Routes>
      <Route path='/' element = {<Home/>}></Route>

      <Route path='/signin' element = {<SignInModal/>}></Route>
      <Route path='/signup' element = {<SignUpModal/>}></Route>

      {/* --- ADMIN ROUTES --- */}
      <Route path='/admin' element={
        <ProtectedAdmin>
          <Admin />
        </ProtectedAdmin>
      }>
        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUser />} />
        <Route path="genres" element={<AdminGenre />} />
        <Route path="albums" element={<AdminAlbum />} />
        <Route path="songs" element={<AdminSong />} />
        <Route path="banners" element={<AdminBanner />} />
        <Route path="subscriptions" element={<AdminSubscription />} />
        <Route path="artists" element={<AdminArtists />} />
      </Route>

      {/* --- PUBLIC USER ROUTES --- */}
      <Route path='/artists' element = {<Artists/>}></Route>
      <Route path='/genre' element = {<Genre/>}></Route>
      <Route path='/more-genres' element = {<MoreGenres/>}></Route>
      <Route path='/album' element = {<Album/>}></Route>
      <Route path='/album/featured-albums' element = {<AllFeaturedAlbums/>}></Route>
      <Route path='/album/trending-albums' element = {<AllTrendingAlbums/>}></Route>
      <Route path='/album/artists-albums' element = {<AllAlbumsByArtists/>}></Route>
      <Route path='/favourite' element = {<Favourite/>}></Route>
      <Route path='/top-track' element = {<TopTrack/>}></Route>
      <Route path="/album/new-releases" element={<AllNewReleases />} />

      <Route path='/artist/login' element={<ArtistLogin />} />
      <Route path='/artist/register' element={<ArtistRegis />} />

      <Route element={<ProtectedArtistRoute />}>
        <Route path="/artist" element={<Navigate to="/artist/dashboard" />} />
        <Route path="/artist/dashboard" element={<ArtistDashboard />} />
        <Route path="/artist/songs" element={<SongManagement />} />
        <Route path="/artist/albums" element={<AlbumManagement />} />
        <Route path="/artist/settings" element={<Settings />} />
      </Route>

      <Route path='/history' element={<History/>}></Route>

    </Routes>
  )
}