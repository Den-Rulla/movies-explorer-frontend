import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <label className='filter-checkbox'>
      <input className='filter-checkbox__input' id='filter-checkbox' type='checkbox' name='short-film' />
      <div className='filter-checkbox__pseudo-elem'>
        <span className='filter-checkbox__circle' />
      </div>
      <span className='filter-checkbox__text'>Короткометражки</span>
    </label>
  );
}