import React from 'react'
import { Route, Routes } from 'react-router'
import Artists from './pages/Artist/Artists'
import Albums from './pages/Album/Albums'

export default function RouterConfig() {
  return (
    <Routes>
      <Route path='/artists' element = {<Artists/>}></Route>
      <Route path='/albums' element = {<Albums/>}></Route>
    </Routes>
  )
}
