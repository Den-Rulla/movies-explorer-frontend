import { useState } from 'react';
import { Helmet } from 'react-helmet';
import './Profile.css';

export default function Profile() {

  function handleSubmit(e) {
    e.preventDefault();
    setShowSaveBtn(false);
  }

  const [showSaveBtn, setShowSaveBtn] = useState(false);

  function handleShowSaveBtn() {
    setShowSaveBtn(true);
  }

  return (
    <section className='profile'>
      <Helmet>
        <title>Аккаунт</title>
      </Helmet>

      <h1 className='profile__title'>Привет, Денис!</h1>
      <form className='profile__form' onSubmit={handleSubmit} id='profile-form'>
        <label className='profile__inputs-cover' htmlFor='name'>
          <span className='profile__input-text'>Имя</span>
          <input className='profile__input' disabled={!showSaveBtn} type='text' id='name' name='name' required defaultValue="Денис" placeholder='Ваше имя' />
        </label>
        <label className='profile__inputs-cover' htmlFor='email'>
          <span className='profile__input-text'>E-mail</span>
          <input className='profile__input' disabled={!showSaveBtn} type='email' id='email' name='email' required defaultValue="email@email.ru" placeholder='Ваш e-mail' />
        </label>
      </form>
      <div className='profile__buttons-cover'>
        {showSaveBtn ? (
          <>
            <span className='profile__update-error'>При обновлении профиля произошла ошибка</span>
            <button className='profile__form-save-btn' type='submit' form='profile-form'>Сохранить</button>
          </>
        ) : (
          <>
            <button className='profile__edit-btn' type='button' onClick={handleShowSaveBtn}>Редактировать</button>
            <button className='profile__logout-btn' type='button'>Выйти из аккаунта</button>
          </>
        )}
      </div>
    </section>
  );
}
