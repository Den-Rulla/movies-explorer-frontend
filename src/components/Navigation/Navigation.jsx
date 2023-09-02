import { Link, NavLink } from 'react-router-dom';
import ProfileIcon from '../../images/profile-icon.svg';
import './Navigation.css';

export default function Navigation() {
  return (
    <section className='navigation'>
      <nav className='navigation__links'>
        <NavLink to='/movies' className={({isActive}) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Фильмы</NavLink>
        <NavLink to='/saved-movies' className={({isActive}) => `navigation__link ${isActive ? 'navigation__link_active' : ''}`}>Сохраненные фильмы</NavLink>
      </nav>
      <Link to='/profile' className='header__profile-link'>
        <p className='header__profile-link-text'>Аккаунт</p>
        <img className='header__profile-link-icon' src={ProfileIcon} alt='Иконка аккаунта' />
      </Link>
    </section>
  );
}
