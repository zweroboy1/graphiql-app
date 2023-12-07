import { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home/Home';
import { Layout } from '../components/Layout/Layout';
import { Register } from '../pages/Register/Register';
import { Login } from '../pages/Login/Login';
import { GraphQl } from '../pages/GraphQl/GraphQl';
import { NotFound } from '../pages/NotFound/NotFound';
import { WithAuthRoute } from './hoc/ProtectedRoutes/withAuth';
import { WithoutAuth } from './hoc/ProtectedRoutes/withoutAuth';

export function Router(): ReactElement {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/register"
          element={
            <WithAuthRoute redirectLink="/">
              <Register />
            </WithAuthRoute>
          }
        />
        <Route
          path="/login"
          element={
            <WithAuthRoute redirectLink="/">
              <Login />
            </WithAuthRoute>
          }
        />
        <Route
          path="/graph-ql"
          element={
            <WithoutAuth redirectLink="/">
              <GraphQl />
            </WithoutAuth>
          }
        />
      </Route>
    </Routes>
  );
}
