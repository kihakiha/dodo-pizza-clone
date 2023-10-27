import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './style/scss/app.scss';

import Home from './pages/Home';
import NotFound404 from './pages/NotFound404';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />}></Route>
        <Route path="pizza/:pizzaId" element={<FullPizza />} />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
