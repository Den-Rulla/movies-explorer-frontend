import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

export default function PageNotFound() {

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <section className='page-not-found'>
      <Helmet>
        <title>Страница не найдена</title>
      </Helmet>
      <h1 className='page-not-found__title'>404</h1>
      <p className='page-not-found__description'>Страница не найдена</p>
      <button className='page-not-found__button' onClick={handleBack}>Назад</button>
    </section>
  );
}
