import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';

function App() {

  const [isAuth, setIsAuth] = useState(true); //переключатель состояния хедера авторизаван/не авторизован

  const { pathname } = useLocation();

  const renderHeader = [
    '/',
    '/movies',
    '/saved-movies',
    '/profile',
  ].includes(pathname);

  const renderFooter = [
    '/',
    '/movies',
    '/saved-movies'
  ].includes(pathname);

  return (
    <div className='page'>
      { renderHeader ? <Header isAuth={isAuth} setIsAuth={setIsAuth} /> : "" }
      <main className='main'>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </main>
      { renderFooter ? <Footer /> : "" }
    </div>
  );
}

export default App;
