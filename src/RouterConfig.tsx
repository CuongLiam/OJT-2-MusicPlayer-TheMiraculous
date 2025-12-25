import React from 'react'
import { Route, Routes } from 'react-router'
import Artists from './pages/Artist/Artists'
import Genre from './pages/Genre/Genre'
import MoreGenres from './pages/Genre/MoreGenres'

export default function RouterConfig() {
  return (
    <Routes>
      <Route path='/artists' element = {<Artists/>}></Route>
      <Route path='/genre' element = {<Genre/>}></Route>
      <Route path='/more-genres' element = {<MoreGenres/>}></Route>
    </Routes>
  )
}
