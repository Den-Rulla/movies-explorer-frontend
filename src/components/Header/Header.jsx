import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation';
import Logo from '../../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <Link to='/' className='header__logo-link'>
        <img className='header__logo' src={Logo} alt='Логотип приложения' />
      </Link>
      <Navigation />
    </header>
  );
}

export default Header;
