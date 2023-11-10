import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies({
  handleDeleteMovie,
  savedMovies,
  isLoading
}) {

  const [findedMovies, setFindedMovies] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isActiveSearch, setIsActiveSearch] = useState(false);
  const lastSearchInSavedMovies = localStorage.getItem('lastSearchInSavedMovies');

  useEffect(() => {
    if (lastSearchInSavedMovies) {
      setFindedMovies(JSON.parse(lastSearchInSavedMovies));
    }
  }, [lastSearchInSavedMovies]);

  function handleSearch(query, isShort) {

    const searchResult = savedMovies.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const lowerCaseNameRU = movie.nameRU.toLowerCase();
      const lowerCaseNameEN = movie.nameEN.toLowerCase();

      setIsActiveSearch(true);

      return (
        (lowerCaseNameRU.includes(lowerCaseQuery) || lowerCaseNameEN.includes(lowerCaseQuery)) &&
        (!isShort || movie.duration <= 40)
      );
    });

    setFindedMovies(searchResult);
    localStorage.setItem('lastSearchInSavedMovies', JSON.stringify(searchResult));

    if (searchResult.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }

  function handleShortMovieChange() {
      setIsShortMovie((prevIsShortMovie) => !prevIsShortMovie);
      handleSearch(searchInputValue, !isShortMovie);
  }

  return (
    <section className='saved-movies'>
      <Helmet>
        <title>Сохраненные фильмы</title>
      </Helmet>

      <SearchForm
        onSubmit={handleSearch}
        handleCheckbox={handleShortMovieChange}
        isShortMovie={isShortMovie}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
      />
      { isActiveSearch ? (
      <MoviesCardList
        allMovies={findedMovies}
        savedMovies={savedMovies}
        findedMovies={findedMovies}
        handleDelete={handleDeleteMovie}
        isLoading={isLoading}
        isNotFound={isNotFound}
      />
      ) : (
        <MoviesCardList
        allMovies={savedMovies}
        savedMovies={savedMovies}
        handleDelete={handleDeleteMovie}
        isLoading={isLoading}
        isNotFound={isNotFound}
      />
      )
      }
    </section>
  );
}
