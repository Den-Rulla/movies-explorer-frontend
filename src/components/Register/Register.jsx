import { Helmet } from 'react-helmet';
import AuthPage from '../AuthPage/AuthPage';
import AuthPageInput from '../AuthPageInput/AuthPageInput';
import './Register.css';

export default function Register() {
  return (
    <section className='register'>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>

      <AuthPage
        title='Добро пожаловать!'
        name='register'
        submitBtnText='Зарегистрироваться'
        textBeforeLink='Уже зарегистрированы?'
        linkAnchor='Войти'
        linkUrl='/signin'
      >
        <AuthPageInput
          label='Имя'
          type='text'
          name='name'
          id='name'
          placeholder='Например, Иван'
          errorText='Проверка имени'
        />
        <AuthPageInput
          label='E-mail'
          type='email'
          name='email'
          id='email'
          placeholder='pochta@yandex.ru'
          errorText='Проверка email'
        />
        <AuthPageInput
          label='Пароль'
          type='password'
          name='password'
          id='password'
          placeholder='Сложный пароль'
          errorText='Проверка пароля'
        />
      </AuthPage>
    </section>
  );
}
