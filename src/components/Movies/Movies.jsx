import { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';
import MoreButton from '../MoreButton/MoreButton';
import { VIEWPORTS } from '../../utils/constants';

export default function Movies({
  handleSaveMovie,
  handleDeleteMovie,
  allMovies,
  savedMovies,
  setSavedMovies,
  isLoading,
}) {

  const [findedMovies, setFindedMovies] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreCards, setMoreCards] = useState(0);
  const lastSearchQuery = localStorage.getItem('lastSearchQuery');
  const lastSearchInMovies = localStorage.getItem('lastSearchInMovies');
  const savedCheckboxPosition = localStorage.getItem('savedCheckboxPosition');

  useEffect(() => {
    if (lastSearchQuery) {
      setSearchInputValue(lastSearchQuery);
    }
    if (lastSearchInMovies) {
      setFindedMovies(JSON.parse(lastSearchInMovies));
    }
    if (savedCheckboxPosition) {
      setIsShortMovie(JSON.parse(savedCheckboxPosition));
    }
  }, [lastSearchQuery, lastSearchInMovies, savedCheckboxPosition]);

  function handleSearch(query, isShort) {
    localStorage.setItem('lastSearchQuery', query);
    localStorage.setItem('savedCheckboxPosition', isShort);

    const searchResult = allMovies.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const lowerCaseNameRU = movie.nameRU.toLowerCase();
      const lowerCaseNameEN = movie.nameEN.toLowerCase();

      return (
        (lowerCaseNameRU.includes(lowerCaseQuery) || lowerCaseNameEN.includes(lowerCaseQuery)) &&
        (!isShort || movie.duration <= 40)
      );
    });

    setFindedMovies(searchResult);
    localStorage.setItem('lastSearchInMovies', JSON.stringify(searchResult));

    if (searchResult.length === 0) {
      setIsNotFound(true);
      localStorage.removeItem('lastSearchQuery');
      localStorage.removeItem('lastSearchInMovies');
    } else {
      setIsNotFound(false);
    }
  }

  function handleShortMovieChange() {
    setIsShortMovie((prevIsShortMovie) => !prevIsShortMovie);

    if (searchInputValue !== '') {
      handleSearch(searchInputValue, !isShortMovie);
    }
  }

  const moviesForRender = useMemo(() => {
    const { MOBILE, HD } = VIEWPORTS;
    const firstRender =
      windowWidth < MOBILE ? 5 : windowWidth < HD ? 8 : 12;
    return findedMovies.slice(0, firstRender + moreCards);
  }, [windowWidth, moreCards, findedMovies]);

  const showMoreButton = findedMovies.length !== moviesForRender.length;

  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const handleMoreButton = () => {
    const { HD } = VIEWPORTS;
    const increment = windowWidth < HD ? 2 : 3;
    setMoreCards(prev => prev + increment);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <section className='movies'>
      <Helmet>
        <title>Фильмы</title>
      </Helmet>

      <SearchForm
        onSubmit={handleSearch}
        handleCheckbox={handleShortMovieChange}
        isShortMovie={isShortMovie}
        searchInputValue={searchInputValue}
        setSearchInputValue={setSearchInputValue}
      />
      <MoviesCardList
        allMovies={moviesForRender}
        savedMovies={savedMovies}
        handleSave={handleSaveMovie}
        handleDelete={handleDeleteMovie}
        setSavedMovies={setSavedMovies}
        isLoading={isLoading}
        isNotFound={isNotFound}
      />
      { showMoreButton && !isLoading ? <MoreButton handleClick={handleMoreButton} /> : '' }

    </section>
  );
}
