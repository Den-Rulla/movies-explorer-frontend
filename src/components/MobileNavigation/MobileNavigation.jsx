import { Link, NavLink } from 'react-router-dom';
import usePopupClose from '../../hooks/usePopupClose';
import ProfileIcon from '../../images/profile-icon.svg';
import './MobileNavigation.css';

export default function MobileNavigation({ isActive, handlerClose }) {

  usePopupClose(isActive, handlerClose);

  return (
    <section className={`mobile-nav ${isActive ? 'mobile-nav_active' : ''}`}>
			<button className='mobile-nav__close-btn' type='button' onClick={handlerClose} />
      	<nav className={`mobile-nav__links ${!isActive ? 'mobile-nav__links_disabled' : ''}`}>
					<NavLink
            to='/'
            className={({isActive}) => `mobile-nav__link ${isActive ?   'mobile-nav__link_active' : ''}`}
            onClick={handlerClose}>
            Главная
          </NavLink>
					<NavLink
            to='/movies'
            className={({isActive}) => `mobile-nav__link ${isActive ? 'mobile-nav__link_active' : ''}`}
            onClick={handlerClose}>
            Фильмы
          </NavLink>
					<NavLink
            to='/saved-movies'
            className={({isActive}) => `mobile-nav__link ${isActive ? 'mobile-nav__link_active' : ''}`}
            onClick={handlerClose}>
            Сохраненные фильмы
          </NavLink>
          <Link
            to='/profile'
            className='mobile-nav__profile-link' onClick={handlerClose}>
              <p className='mobile-nav__profile-link-text'>Аккаунт</p>
              <img className='mobile-nav__profile-link-icon' src={ProfileIcon} 	alt='Иконка аккаунта' />
      	</Link>
      	</nav>
    </section>
  );
}
