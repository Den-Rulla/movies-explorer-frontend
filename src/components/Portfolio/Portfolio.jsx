import { Link } from 'react-router-dom';
import Arrow from '../../images/link-arrow.svg';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <nav className='portfolio__list'>
        <ul className='portfolio__links-list'>
          <li className='portfolio__item'>
            <Link className='portfolio__link' to='https://github.com/Den-Rulla/how-to-learn' target='_blank'>Статичный сайт<img className='portfolio__link-icon' src={Arrow} alt='Стрелка' /></Link>
          </li>
          <li className='portfolio__item'>
            <Link className='portfolio__link' to='https://den-rulla.github.io/russian-travel/' target='_blank'>Адаптивный сайт<img className='portfolio__link-icon' src={Arrow} alt='Стрелка' /></Link>
          </li>
          <li className='portfolio__item'>
            <Link className='portfolio__link' to='https://rda-mesto.nomoreparties.co/' target='_blank'>Одностраничное приложение<img className='portfolio__link-icon' src={Arrow} alt='Стрелка' /></Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}