import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { ToastContainer } from 'react-toastify';
import { TOAST_DELAY } from '../../constants';

export const Layout: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <ToastContainer limit={1} autoClose={TOAST_DELAY} position="top-center" />
      <main className="main" data-testid="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
