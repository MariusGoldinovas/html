import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormAddProduct from './components/form-add-product/FormAddProduct';
import Products from './components/products/Products';
import Header from "./components/header/Header";
import Home from "./components/home-page/Home";
import './App.css';

function App() {
  const [item, setItem] = useState([]); 

  useEffect(() => {
    const savedItem = localStorage.getItem('productList');
    if (savedItem) {
      setItem(JSON.parse(savedItem)); 
    }
  }, []);

  const addItem = (newItem) => {
    const updatedItemCart = [...item, newItem]; 
    setItem(updatedItemCart);
    localStorage.setItem('productList', JSON.stringify(updatedItemCart))
  };

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/home-page" element={<Home />} />
          <Route path="/products" element={<Products products={item} />} />
          <Route path="/form-add-product" element={<FormAddProduct addItem={addItem} />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
