import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as auth from '../../utils/Auth';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import {
  errorsList,
  REGISTER_ERROR,
  AUTORIZE_ERROR,
  UPDATE_ERROR,
  SERVER_ERROR,
  REGISTER_OK,
  AUTORIZE_OK,
  UPDATE_TOOLTIP_OK,
  UPDATE_OK
} from '../../utils/constants';

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
  const [isLoading, setIsLoading] = useState(true);
  const [toolTipText, setToolTipText] = useState('');
  const [openToolTip, setOpenToolTip] = useState(false);
  const { pathname } = useLocation();
  const [allMovies, setAllMovies] = useState({});
  const [savedMovies, setSavedMovies] = useState({});
  const [toolTipErr, setToolTipErr] = useState(false);

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
    if (['/signup', '/signin'].includes(pathname) && !isAuth) {
      setIsLoading(false);
    }
  }, [pathname, isAuth]);

  useEffect(() => {
    const token = localStorage.getItem('token');
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
          if (err === 'Ошибка: 401') {
            handleExit();
          } else {
            setToolTipErr(true);
            setToolTipText(errorsList[err]?.message ?? SERVER_ERROR);
            setOpenToolTip(true);
          }
        });
    }
  }, []);

  async function fetchMoviesAndUserInfo() {
    try {
      const allMovies = await moviesApi.getMovies();
      const userInfo = await mainApi.getUserInfo();
      const savedMovies = await mainApi.getSavedMovies();
      setCurrentUser(userInfo);
      setAllMovies(allMovies);
      setSavedMovies(savedMovies);
    } catch (err) {
      console.log(`${err}`);
      setToolTipErr(true);
      setToolTipText(errorsList[err]?.message ?? SERVER_ERROR);
      setOpenToolTip(true);
    }
  }

  useEffect(() => {
    if (isAuth) {
      fetchMoviesAndUserInfo()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [isAuth]);

  function handleRegister({ name, email, password }) {
    setIsLoading(true);
    auth
      .register({ name, email, password })
      .then((res) => {
        setToolTipText(REGISTER_OK);
        setToolTipErr(false);
        setOpenToolTip(true);
        if (res) {
          handleLogin({email: email, password: password});
        }
      })
      .catch((err) => {
        setServerAnswer(errorsList[err]?.message ?? REGISTER_ERROR);
        setIsLoading(false);
      })
    }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    auth
      .authorize({ email, password })
      .then((confirm) => {
        if (confirm.token) {
          setCurrentUser({ email, password })
          localStorage.setItem('token', confirm.token);
          setIsAuth(true);
          setToolTipText(AUTORIZE_OK);
          setToolTipErr(false);
          setOpenToolTip(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setServerAnswer(errorsList[err]?.message ?? AUTORIZE_ERROR);

      })
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .editUserInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
        setOkMessage(UPDATE_OK);
        setToolTipText(UPDATE_TOOLTIP_OK);
        setToolTipErr(false);
        setOpenToolTip(true);
      })
      .catch((err) => {
        setServerAnswer(errorsList[err]?.message ?? UPDATE_ERROR);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie(movie, handleButtonToggle) {
    mainApi
      .addMovie(movie)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        handleButtonToggle(true);
      })
      .catch((err) => {
        console.log(err);
          setToolTipErr(true);
          setToolTipText(errorsList[err]?.message ?? SERVER_ERROR);
          setOpenToolTip(true);
      });
  }

  function handleDeleteMovie(movieId, handleButtonToggle) {
    const lastSearchInSavedMovies = JSON.parse(localStorage.getItem('lastSearchInSavedMovies'));
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        handleButtonToggle(false)
        const newSavedMovies = savedMovies.filter((item) => item._id !== movieId)
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));

        if (lastSearchInSavedMovies) {
          const newSearchInSavedMovies = lastSearchInSavedMovies.filter((item) => item._id !== movieId)
          localStorage.setItem('lastSearchInSavedMovies', JSON.stringify(newSearchInSavedMovies));
        }
      })
      .catch((err) => {
        console.log(err);
          setToolTipErr(true);
          setToolTipText(errorsList[err]?.message ?? SERVER_ERROR);
          setOpenToolTip(true);
      });
  }

  function handleExit() {
    setIsAuth(false);
    localStorage.clear();
    setSavedMovies();
    navigate('/', { replace: true });
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
              <Route element={<ProtectedRoute isAuth={isAuth} />}>
              <Route path='/movies'
                element={
                  <Movies
                    isAuth={isAuth}
                    isLoading={isLoading}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    allMovies={allMovies}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                }
              />
              <Route path='/saved-movies'
                element={
                  <SavedMovies
                    isAuth={isAuth}
                    isLoading={isLoading}
                    handleSaveMovie={handleSaveMovie}
                    handleDeleteMovie={handleDeleteMovie}
                    savedMovies={savedMovies}
                    setSavedMovies={setSavedMovies}
                  />
                }
              />
              <Route path='/profile'
                element={
                  <Profile
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
              </Route>
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
            toolTipErr={toolTipErr}
            setOpenToolTip={setOpenToolTip}
            toolTipText={toolTipText}
          />

        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
