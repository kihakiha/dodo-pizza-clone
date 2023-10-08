import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './style/scss/app.scss';

import Header from './Components/Header';
import Home from './pages/Home';
import NotFound404 from './pages/NotFound404';
import Cart from './pages/Cart';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
