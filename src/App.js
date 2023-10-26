import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './style/scss/app.scss';

import Header from './Components/Header';
import Home from './pages/Home';
import NotFound404 from './pages/NotFound404';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/pizza/:pizzaId" element={<FullPizza />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
