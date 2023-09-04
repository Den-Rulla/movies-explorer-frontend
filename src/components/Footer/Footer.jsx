import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__copyright-cover'>
        <p className='footer__copyright'>&copy; 2023</p>
        <nav className='footer__nav'>
          <ul className='footer__links-list'>
            <li className='footer__links-item'>
              <Link className='footer__link' to='https://practicum.yandex.ru/' target='_blank'>Яндекс.Практикум</Link>
            </li>
            <li className='footer__links-item'>
              <Link className='footer__link' to='https://github.com/Den-Rulla' target='_blank'>Github</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}