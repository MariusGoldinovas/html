import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home-page/Home";
import Header from './components/header/Header';
import AddUser from './components/add-user/AddUser';
import Login from './components/login/Login';
import Upload from './components/upload/Upload';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/video/')
    .then(resp => resp.json())
    .then(resp => setData(resp));


    // fetch('http://localhost:3000/api/video/', {
    //   body: {
    //     title: 'Iš reacto persiųsti duomenys',
    //     description: 'Aprašymas',
    //     thumbnail: 'Nera',
    //     videoId: 'nera'
    //   }, //Persiunčiamas turinys
    //   method: 'POST' //Persiunčiamų duomenų metodas (GET, POST, PUT, PATCH, DELETE)
    // })
    // .then(resp => resp.json())
    // .then(resp => console.log(resp));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home data={data} />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
