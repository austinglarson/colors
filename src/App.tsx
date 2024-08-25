import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'
import ColorNames from './ColorNames'
import Quiz from './Quiz'
import Footer from './Footer'
import colorData from './data/colors.json'
import './App.scss'

export interface Color {
  name: string,
  hex: string,
  rgb: string,
  families: string[]
}

// Popular (not all) color families
const colorFamilies: Array<string> = ["blue", "brown", "dark", "gray", "light", "medium", "orange", "pink", "purple", "red", "slate", "tan", "white", "yellow"];

interface ColorFamily {
  name: string;
  colors: Color[];
}
const colorFamilyArray: ColorFamily[] = [];

for (let colorFamily of colorFamilies) {
  colorFamilyArray.push({"name": colorFamily, "colors": []});
}
for (let colorFamily of colorFamilyArray) {
  for (let color of colorData) {
    if (color.families.includes(colorFamily.name)) {
      colorFamily.colors.push(color);
    }
  }
}
export const colorFamilyData = colorFamilyArray;

function App() {
  console.log('Render App');
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ColorNames />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>

      <Footer />
    </>
  )
}

export default App
