import { useContext, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './Profile.css';

export default function Profile({
  handleExit,
  handleUpdateUser,
  serverAnswer,
  setServerAnswer,
  okMessage,
  setOkMessage,
  isLoading
}) {

  const {
    values,
    setValues,
    handleChange,
    handleChangeEmail,
    errors,
    isValid,
    setIsValid
  } = useFormAndValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
		setServerAnswer('');
    setOkMessage('');
	}, [setServerAnswer, setOkMessage]);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
    setIsValid(true);
  }, [currentUser, setValues, setIsValid]);

  useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setIsValid(false);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    setServerAnswer('');
    handleUpdateUser({name: values.name, email: values.email});
    if (!isLoading) {
      setShowSaveBtn(false);
    }
  }

  const [showSaveBtn, setShowSaveBtn] = useState(false);

  function handleShowSaveBtn() {
    setShowSaveBtn(true);
    setOkMessage('');
  }

  return (
    <section className='profile'>
      <Helmet>
        <title>Аккаунт</title>
      </Helmet>

      <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
      <form className={`profile__form ${!isValid ? 'profile__form_type_error' : ''}`}
        onSubmit={handleSubmit}
        id='profile-form'
        noValidate
      >
      <span className='profile__error'>{errors.name || ''}</span>
        <label className='profile__inputs-cover' htmlFor='name'>
          <span className='profile__input-text'>Имя</span>
          <input
            className={`profile__input ${errors.name ? 'profile__input_error' : ''}`}
            disabled={!showSaveBtn && !serverAnswer}
            type='text'
            id='name'
            name='name'
            minLength={2}
            maxLength={20}
            value={values.name || ''}
            onChange={handleChange}
            required
            placeholder='Ваше имя'
          />
        </label>
        <label className='profile__inputs-cover' htmlFor='email'>
          <span className='profile__input-text'>E-mail</span>
          <input
            className={`profile__input ${errors.email ? 'profile__input_error' : ''}`}
            disabled={!showSaveBtn && !serverAnswer}
            type='email'
            id='email'
            name='email'
            value={values.email || ''}
            onChange={handleChangeEmail}
            required
            placeholder='Ваш e-mail'
          />
        </label>
        <span className='profile__error'>{errors.email || ''}</span>
      </form>
      <div className='profile__buttons-cover'>
        {showSaveBtn || isLoading || serverAnswer ? (
          <>
            <span className='profile__server-answer'>
              {serverAnswer}
            </span>
            <button className={`profile__form-save-btn ${!isValid || isLoading ? 'profile__form-save-btn_disabled' : ''}`}
              type='submit'
              disabled={!isValid || isLoading}
              form='profile-form'>
              {`${isLoading ? 'Сохранение... Подождите' : 'Сохранить'}`}
            </button>
          </>
        ) : (
          <>
            <span className='profile__server-answer profile__server-answer_ok'>
              {okMessage}
            </span>
            <button className='profile__edit-btn'
              type='button'
              onClick={handleShowSaveBtn}>
                Редактировать
              </button>
            <button className='profile__logout-btn'
              type='button'
              onClick={handleExit}>
                Выйти из аккаунта
              </button>
          </>
        )}
      </div>
    </section>
  );
}
