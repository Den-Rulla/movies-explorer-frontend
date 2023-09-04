import Navigation from '../Navigation/Navigation';
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import AuthNavigation from '../AuthNavigation/AuthNavigation';
import Logo from '../Logo/Logo';
import './Header.css';
import { useState } from 'react';

export default function Header({ isAuth }) {

  const [isMobNavOpen, setIsMobNavOpen] = useState(false);

  function handleMobNav() {
    setIsMobNavOpen(!isMobNavOpen);
  }

  return (
    <header className='header'>
      <Logo />
      { isAuth ? <Navigation /> : <AuthNavigation /> }
      { isAuth ? <button className='header__burger-btn' onClick={handleMobNav} /> : '' }
      <MobileNavigation isActive={isMobNavOpen} handlerClose={handleMobNav} />
    </header>
  );
}
