import React from 'react';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import { useLocalization } from '../../contexts/locale.context';

export const NotFound: React.FC = () => {
  const { t } = useLocalization();
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <section className="notfound">
          <h1 className="notfound__h1 h1">{t.PageNotFound}</h1>
          <div className="notfound__img"></div>
          <div>
            <Link to="/">{t.WelcomePage}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
