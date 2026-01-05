import { Navigate, Route, Routes } from 'react-router'
import Artists from './pages/Artist/Artists'
import Home from './pages/home/Home'
import Genre from './pages/Genre/Genre'
import MoreGenres from './pages/Genre/MoreGenres'
import Album from './pages/Album/Album'
import AllFeaturedAlbums from './pages/Album/AllFeaturedAlbums'
import AllTrendingAlbums from './pages/Album/AllTrendingAlbums'
import AllAlbumsByArtists from './pages/Album/AllAlbumsByArtists'
import Admin from './pages/Admin/Admin'
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
import RequireAdmin from './pages/Admin/auth/RequireAdmin'
import RequireAuth from './components/auth/RequireAuth'
import ProtectedArtistRoute from './pages/ArtistAdmin/components/ProtectedArtistRoute'
import ArtistDashboard from './pages/ArtistAdmin/components/ArtistDashboard'
import SongManagement from './pages/ArtistAdmin/components/SongManagement'
import AlbumManagement from './pages/ArtistAdmin/components/AlbumManagement'
import Settings from './pages/ArtistAdmin/components/Settings'
import ArtistLogin from './pages/ArtistAdmin/auth/ArtistLogin'
import ArtistRegis from './pages/ArtistAdmin/auth/ArtistRegis'
import History from './pages/History/history'

export default function RouterConfig() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path='/' element = {<Home/>}></Route>

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <Admin />
          </RequireAdmin>
        }
      >
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

      {/* PROTECTED USER ROUTES */}
      <Route
        path="/artists"
        element={
          <RequireAuth>
            <Artists />
          </RequireAuth>
        }
      />

      <Route
        path="/genre"
        element={
          <RequireAuth>
            <Genre />
          </RequireAuth>
        }
      />

      <Route
        path="/more-genres"
        element={
          <RequireAuth>
            <MoreGenres />
          </RequireAuth>
        }
      />

      <Route
        path="/album"
        element={
          <RequireAuth>
            <Album />
          </RequireAuth>
        }
      />

      <Route
        path="/album/featured-albums"
        element={
          <RequireAuth>
            <AllFeaturedAlbums />
          </RequireAuth>
        }
      />

      <Route
        path="/album/trending-albums"
        element={
          <RequireAuth>
            <AllTrendingAlbums />
          </RequireAuth>
        }
      />

      <Route
        path="/album/artists-albums"
        element={
          <RequireAuth>
            <AllAlbumsByArtists />
          </RequireAuth>
        }
      />

      <Route
        path="/album/new-releases"
        element={
          <RequireAuth>
            <AllNewReleases />
          </RequireAuth>
        }
      />

      <Route
        path="/favourite"
        element={
          <RequireAuth>
            <Favourite />
          </RequireAuth>
        }
      />

      <Route
        path="/top-track"
        element={
          <RequireAuth>
            <TopTrack />
          </RequireAuth>
        }
      />

    
      <Route path='/artist/login' element={<ArtistLogin />} />
      <Route path='/artist/register' element={<ArtistRegis />} />

      <Route element={<ProtectedArtistRoute />}>
        <Route path="/artist" element={<Navigate to="/artist/dashboard" />} />
        <Route path="/artist/dashboard" element={<ArtistDashboard />} />
        <Route path="/artist/songs" element={<SongManagement />} />
        <Route path="/artist/albums" element={<AlbumManagement />} />
        <Route path="/artist/settings" element={<Settings />} />
      </Route>

      <Route path='/history' element={
          <RequireAdmin>
            <History/>
          </RequireAdmin>
        }></Route>

    </Routes>
  )
}
