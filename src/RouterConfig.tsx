import { Route, Routes } from 'react-router'
import Artists from './pages/Artist/Artists'
import Home from './pages/Home/Home'
import Genre from './pages/Genre/Genre'
import MoreGenres from './pages/Genre/MoreGenres'
import Test from './pages/Artist/Test'
import Album from './pages/Album/Album'
import AllFeaturedAlbums from './pages/Album/AllFeaturedAlbums'
import AllTrendingAlbums from './pages/Album/AllTrendingAlbums'
import AllAlbumsByArtists from './pages/Album/AllAlbumsByArtists'

export default function RouterConfig() {
  return (
    <Routes>
      <Route path='/artists' element = {<Artists/>}></Route>
      <Route path='/' element = {<Home/>}></Route>
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
