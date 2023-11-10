import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ onSubmit, searchInputValue, setSearchInputValue, handleCheckbox, isShortMovie }) {

  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (searchInputValue) {
      setErrorText('');
    }
  }, [searchInputValue]);

  function handleChangeSearch(evt) {
    setSearchInputValue(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchInputValue) {
      setErrorText('Введите ключевое слово');
      return;
    } else {
        onSubmit(searchInputValue, isShortMovie);
        setErrorText('');
    }
  }

  return (
    <section className='search-form-section'>
      <div className='search-form-cover'>
        <form className='search-form' onSubmit={handleSubmit} noValidate>
          <input type='text' className='search-form__input' placeholder='Фильм' name='search' onChange={handleChangeSearch} value={searchInputValue} required />
          <button className='search-form__btn' type='submit' disabled={errorText}>Поиск</button>
        </form>
        <span className='search-form__error'>{errorText}</span>

        <FilterCheckbox
          handleChange={handleCheckbox}
          isShortMovie={isShortMovie}
        />
      </div>
    </section>
  );
}
