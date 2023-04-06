import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AddEdit from './pages/AddEdit'
import Home from './pages/Home'
import View from './pages/View'
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Header />

          <Routes>
           <Route path='/' element={<Home/>} />
           <Route path="/add" element={<AddEdit/>} />
           <Route path="/update/:id" element={<AddEdit/>} />
           <Route path="/view/:id" element={<View/>} />
          </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
 