import { useEffect, useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './SearchForm.css';

export default function SearchForm() {

  const {values, handleChangeSearch, errors, isValid } = useFormAndValidation();

  const [errorText, setErrorText] = useState([]);

  useEffect(() => {
    if (isValid) {
      setErrorText('');
    }
  }, [isValid]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!isValid) {
      setErrorText('Нужно ввести ключевое слово');
      return;
    }
  }

  return (
    <section className='search-form-section'>
      <div className='search-form-cover'>
        <form className='search-form' onSubmit={handleSubmit} noValidate>
          <input type='text' className='search-form__input' placeholder='Фильм' name='search' onChange={handleChangeSearch} value={values.search || ''} required />
          <button className='search-form__btn' type='submit' disabled={errors.search}>Поиск</button>
        </form>
        <span className='search-form__error'>{`${errorText ? errorText : errors.search}`}</span>
        <FilterCheckbox />
      </div>
    </section>
  );
}
