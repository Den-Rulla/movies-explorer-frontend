import { NavLink } from 'react-router-dom';
import './AuthNavigation.css';

export default function AuthNavigation() {
  return (
		<section className="auth-navigation">
      <nav className="auth-navigation__links">
        <NavLink to="/signup" className='auth-navigation__register-link'>Регистрация</NavLink>
        <NavLink to="/signin" className='auth-navigation__login-link'>Войти</NavLink>
      </nav>
    </section>
  );
}