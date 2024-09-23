import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneratorApp from "./components/generator/GeneratorApp";
import CalculatorApp from './components/calculator/CalculatorApp'
import Header from "./components/header/Header";
import Product from "./components/list/Product";
import BlogApp from "./components/blog/BlogApp";
import Home from "./pages/Home";

import './App.css'

function App() {


  return (
    <>
    <BrowserRouter>
      <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<CalculatorApp />} />
            <Route path="/generator" element={<GeneratorApp />} />
            <Route path="/list" element={<Product />} />
            <Route path="/blog" element={<BlogApp />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
