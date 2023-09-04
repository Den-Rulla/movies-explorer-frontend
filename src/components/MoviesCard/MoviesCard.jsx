import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import TestMovieImg from '../../images/test-movie.jpg';

export default function MoviesCard() {

  const [isSaved, setIsSaved] = useState(false);

  const { pathname } = useLocation();

  function handleButtonToggle() {
    setIsSaved(!isSaved);
  }

  return (
    <li className='movies-card'>
      <div className='movies-card__text'>
        <h2 className='movies-card__title'>В погоне за счестьем</h2>
        <p className='movies-card__duration'>1ч 57м</p>
      </div>
      <img className='movies-card__image' src={TestMovieImg} alt='Постер к фильму' />
      {pathname === '/saved-movies' ? (
          <button
            className='movies-card__button movies-card__button_type_delete'
            type='button'
          />
        ) : !isSaved ? (
          <button
            className='movies-card__button'
            type='button'
            onClick={handleButtonToggle}>
              Сохранить
          </button>
        ) : (
          <button
            className='movies-card__button movies-card__button_type_saved'
            type='button'
            onClick={handleButtonToggle}
          />
        )
      }
    </li>
  );
}
