import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Layout } from '../components/Layout/Layout';
import { Register } from '../pages/Register/Register';
import { Login } from '../pages/Login/Login';

export function Router(): ReactElement {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
