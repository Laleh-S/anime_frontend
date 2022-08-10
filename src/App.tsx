import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Createanime from './components/CreateAnime'
import AnimeShow from './components/AnimeShow'
import AnimeIndex from './components/AnimeIndex'
import Home from './components/Home'




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/Createanime" element={<Createanime />} />
        <Route path="/anime" element={<AnimeIndex />} />
        <Route path="/anime/:animeId" element={<AnimeShow />} />
      </Routes>
    </Router>
  )
}

export default App
