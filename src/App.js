import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './style/scss/app.scss';

import Header from './Components/Header';
import Home from './pages/Home';
import NotFound404 from './pages/NotFound404';
import Cart from './pages/Cart';

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  console.log(searchValue);

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
