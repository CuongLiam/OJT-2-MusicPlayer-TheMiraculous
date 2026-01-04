import { Route, Routes } from 'react-router'
import Artists from './pages/Artist/Artists'
import Home from './pages/home/Home'
import Genre from './pages/Genre/Genre'
import MoreGenres from './pages/Genre/MoreGenres'
import Test from './pages/Artist/Test'
import Album from './pages/Album/Album'
import AllFeaturedAlbums from './pages/Album/AllFeaturedAlbums'
import AllTrendingAlbums from './pages/Album/AllTrendingAlbums'
import AllAlbumsByArtists from './pages/Album/AllAlbumsByArtists'
import Admin from './pages/Admin/Admin'
import ProtectedAdmin from './pages/Admin/auth/ProtectedAdmin'
import SignInModal from './components/auth/SignInModal'
import SignUpModal from './components/auth/SignUpModal'

export default function RouterConfig() {
  return (
    <Routes>
      <Route path='/' element = {<Home/>}></Route>

      <Route path='/signin' element = {<SignInModal/>}></Route>
      <Route path='/signup' element = {<SignUpModal/>}></Route>

      <Route path='/admin' element = {
        <ProtectedAdmin>
          <Admin/>
          
        </ProtectedAdmin>
      }></Route>


      <Route path='/artists' element = {<Artists/>}></Route>
      <Route path='/genre' element = {<Genre/>}></Route>
      <Route path='/more-genres' element = {<MoreGenres/>}></Route>
      <Route path='/test' element = {<Test/>}></Route>
      <Route path='/album' element = {<Album/>}></Route>
      <Route path='/album/featured-albums' element = {<AllFeaturedAlbums/>}></Route>
      <Route path='/album/trending-albums' element = {<AllTrendingAlbums/>}></Route>
      <Route path='/album/artists-albums' element = {<AllAlbumsByArtists/>}></Route>
    </Routes>
  )
}
