import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MoviesCard.css';

export default function MoviesCard({ movie, handleSaveMovie, handleDeleteMovie, savedMovies, setSavedMovies, ...props }) {

  const { pathname } = useLocation();
  const [isSaved, setIsSaved] = useState(false);
  const onSavedPage = ['/saved-movies'].includes(pathname);

  useEffect(() => {
    if (savedMovies.some((movie) => movie.movieId === props.id)) {
      setIsSaved(true);
    }
  }, [savedMovies, props.id]);

  function calcDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  function handleSave() {
      const movieCardData = {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image:  'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
        movieId: movie.id,
      };
      handleSaveMovie(movieCardData, setIsSaved);
    };

    const addId = (array) => {
      if (array.length === 0) {
        return false;
      }

      return savedMovies.reduce((acc, item) => {
        if (item.movieId === movie.id) {
          movie._id = item._id;
          return true;
        }
        return acc;
      },
      false
      );
    };

    function handleDelete() {
      addId(movie)
      handleDeleteMovie(movie._id || movie.id, setIsSaved);
    };

  return (
    <li className='movies-card'>
      <div className='movies-card__text'>
        <h2 className='movies-card__title'>{movie.nameRU}</h2>
        <p className='movies-card__duration'>{calcDuration(movie.duration)}</p>
      </div>
      <Link className='movies-card__link' to={movie.trailerLink} target='_blank'><img className='movies-card__image' src={!onSavedPage ? `https://api.nomoreparties.co${movie.image.url}` : movie.image} alt={`Постер к фильму ${movie.nameRU}`} /></Link>
      {onSavedPage ? (
          <button
            className='movies-card__button movies-card__button_type_delete'
            type='button'
            onClick={handleDelete}
          />
        ) : !isSaved ? (
          <button
            className='movies-card__button'
            type='button'
            onClick={handleSave}>
              Сохранить
          </button>
        ) : (
          <button
            className='movies-card__button movies-card__button_type_saved'
            type='button'
            onClick={handleDelete}
          />
        )
      }
    </li>
  );
}
