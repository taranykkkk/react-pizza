import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = React.lazy(
  () => import(/*webpackChunkName: "Cart" */ './pages/Cart'),
);
const FullPizza = React.lazy(
  () => import(/*webpackChunkName: "FullPizza" */ './pages/FullPizza'),
);
const NotFound = React.lazy(
  () => import(/*webpackChunkName: "NotFound" */ './pages/NotFound'),
);

const App: React.FC = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/cart"
                element={
                  <React.Suspense fallback={<div>Завантаження...</div>}>
                    <Cart />
                  </React.Suspense>
                }
              />
              <Route
                path="/pizza/:id"
                element={
                  <React.Suspense fallback={<div>Завантаження...</div>}>
                    <FullPizza />
                  </React.Suspense>
                }
              />

              <Route
                path="*"
                element={
                  <React.Suspense fallback={<div>Завантаження...</div>}>
                    <NotFound />
                  </React.Suspense>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
