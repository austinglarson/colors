import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'
import ColorNames from './ColorNames'
import Quiz from './Quiz'
import './App.scss'

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ColorNames />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
