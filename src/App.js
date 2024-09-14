import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import Layout from './pages/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<HomePage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/about" element={<AboutPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />  
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;