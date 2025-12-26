import React from 'react'
import { Route, Routes } from 'react-router'
import Artists from './pages/Artist/Artists'
import Home from './pages/home/Home'

export default function RouterConfig() {
  return (
    <Routes>
      <Route path='/artists' element = {<Artists/>}></Route>
      <Route path='/' element = {<Home/>}></Route>
    </Routes>
  )
}
