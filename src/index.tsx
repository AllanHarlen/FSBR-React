import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Home/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/Home/Register';
import LayoutPrincipal from './layout/LayoutPrincipal';
import Produtos from './pages/Crud/Produtos';
import Categorias from './pages/Crud/Categorias';
import { Provider } from 'react-redux';
import PrivateRoute from "./components/PrivateRoute"; // Importando o PrivateRoute
import { store } from './app/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<LayoutPrincipal />} />
          <Route element={<LayoutPrincipal />}>
            <Route
              path="/produtos"
              element={<PrivateRoute element={<Produtos />} />}
            />
            <Route
              path="/categorias"
              element={<PrivateRoute element={<Categorias />} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
