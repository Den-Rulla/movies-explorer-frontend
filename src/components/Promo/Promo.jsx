import { HashLink as Link } from 'react-router-hash-link';
import PromoLogo from '../../images/promo-logo.png';
import './Promo.css';

export default function Promo() {
  return (
    <section className='promo'>
        <div className='promo__text'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className='promo__description'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <Link smooth={true} to='/#learn-more' className='promo__link'>Узнать больше</Link>
      </div>
      <img className='promo__logo' src={PromoLogo} alt='Логотип дипломной работы' />
    </section>
  );
}
