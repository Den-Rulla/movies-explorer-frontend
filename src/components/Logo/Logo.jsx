import { Link } from 'react-router-dom'
import LogoIcon from '../../images/logo.svg';
import './Logo.css';

export default function Logo() {
  return (
    <Link to='/' className='logo-link'>
      <img className='logo' src={LogoIcon} alt='Логотип приложения' />
    </Link>
  );
}