import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/Auth';
import { mainApi } from '../../utils/MainApi';
import {
  errorsList,
  REGISTER_ERROR,
  AUTORIZE_ERROR,
  UPDATE_ERROR,
  REGISTER_OK,
  AUTORIZE_OK,
  UPDATE_TOOLTIP_OK,
  UPDATE_OK
} from '../../utils/constants';
import { moviesApi } from '../../utils/MoviesApi';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import './App.css';

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [serverAnswer, setServerAnswer] = useState('');
  const [okMessage, setOkMessage] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [toolTipText, setToolTipText] = useState('');
  const [openToolTip, setOpenToolTip] = useState(false);
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

  useEffect(() => {
    setTimeout(() => {
      if (openToolTip) {
        setOpenToolTip(false);
      }
    }, 3000);
  }, [openToolTip]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          if (res) {
            setIsAuth(true);
              if (['/signup', '/signin'].includes(pathname)) {
              navigate('/movies', { replace: true });
            } else {
              navigate(pathname, { replace: true });
            }
          }
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      mainApi
        .getUserInfo()
        .then((userData) => setCurrentUser(userData))
    }
  }, [isAuth]);

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        setToolTipText(REGISTER_OK);
        setOpenToolTip(true);
        if (res) {
          handleLogin({email: email, password: password});
        }
      })
      .catch((err) => {
        setServerAnswer(errorsList[err]?.message ?? REGISTER_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .authorize({ email, password })
      .then((confirm) => {
        if (confirm.token) {
          setCurrentUser({ email, password })
          localStorage.setItem("token", confirm.token);
          setIsAuth(true);
          setToolTipText(AUTORIZE_OK);
          setOpenToolTip(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        setServerAnswer(errorsList[err]?.message ?? AUTORIZE_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .editUserInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
        setOkMessage(UPDATE_OK);
        setToolTipText(UPDATE_TOOLTIP_OK);
        setOpenToolTip(true);
      })
      .catch((err) => {
        setServerAnswer(errorsList[err]?.message ?? UPDATE_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleExit() {
    setIsAuth(false);
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        { renderHeader ? <Header isAuth={isAuth} setIsAuth={setIsAuth} /> : '' }
        <main className='main'>
          <Routes>
            <Route path='/'
              element={
                <Main />
                }
            />
            <Route path='/movies'
              element={
                <ProtectedRoute
                  element={Movies}
                  isAuth={isAuth}
                />
              }
            />
            <Route path='/saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  isAuth={isAuth}
                />
              }
            />
            <Route path='/profile'
              element={
                <ProtectedRoute
                  element={Profile}
                  handleExit={handleExit}
                  handleUpdateUser={handleUpdateUser}
                  serverAnswer={serverAnswer}
                  setServerAnswer={setServerAnswer}
                  isLoading={isLoading}
                  okMessage={okMessage}
                  setOkMessage={setOkMessage}
                  isAuth={isAuth}
                />
              }
            />
            <Route path='/signin'
              element={
                <Login
                  handleLogin={handleLogin}
                  serverAnswer={serverAnswer}
                  setServerAnswer={setServerAnswer}
                  isLoading={isLoading}
                />
              }
            />
            <Route path='/signup'
              element={
                <Register
                  handleRegister={handleRegister}
                  serverAnswer={serverAnswer}
                  setServerAnswer={setServerAnswer}
                  isLoading={isLoading}
                />
              }
            />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
        { renderFooter ? <Footer /> : '' }

        <InfoTooltip
          openToolTip={openToolTip}
          setOpenToolTip={setOpenToolTip}
          toolTipText={toolTipText}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
