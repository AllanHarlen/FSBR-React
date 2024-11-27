import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Home/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Home/Register';
import LayoutPrincipal from './layout/LayoutPrincipal';
import Produtos from './pages/Crud/Produtos';
import Categorias from './pages/Crud/Categorias';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<LayoutPrincipal />} />
          <Route element={<LayoutPrincipal />}>
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/categorias" element={<Categorias />} />
          </Route>          
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
