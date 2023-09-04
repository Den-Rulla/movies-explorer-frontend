import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className='search-form-section'>
      <div className='search-form-cover'>
        <form className='search-form' onSubmit={handleSubmit}>
          <input type='text' className='search-form__input' placeholder='Фильм' required />
          <button className='search-form-btn' type='submit'>Поиск</button>
        </form>
        <FilterCheckbox />
      </div>
    </section>
  );
}
