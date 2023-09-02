import { Helmet } from 'react-helmet';
import './Profile.css';

export default function Profile() {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className='profile'>
      <Helmet>
        <title>Аккаунт</title>
      </Helmet>

      <h1 className='profile__title'>Привет, Денис!</h1>
      <form className='profile__form' onSubmit={handleSubmit}>
        <label className='profile__inputs-cover' htmlFor='name'>
          <span className='profile__input-text'>Имя</span>
          <input className='profile__input' type='text' id='name' name='name' required defaultValue="Денис" placeholder='Ваше имя' />
        </label>
        <label className='profile__inputs-cover' htmlFor='email'>
          <span className='profile__input-text'>E-mail</span>
          <input className='profile__input' type='email' id='email' name='email' required defaultValue="email@email.ru" placeholder='Ваш e-mail' />
        </label>
        <button className='profile__form-edit-btn' type='submit'>Редактировать</button>
      </form>
      <button className='profile__logout-btn' type='button'>Выйти из аккаунта</button>
    </section>
  );
}
