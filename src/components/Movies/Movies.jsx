import { Helmet } from 'react-helmet';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import MoreButton from '../MoreButton/MoreButton';

export default function Movies() {
  return (
    <section className='movies'>
      <Helmet>
        <title>Фильмы</title>
      </Helmet>

      <SearchForm />
      <MoviesCardList />
      <MoreButton />
    </section>
  );
}
