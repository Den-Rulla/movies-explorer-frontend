import { Helmet } from 'react-helmet';
import AuthPage from '../AuthPage/AuthPage';
import AuthPageInput from '../AuthPageInput/AuthPageInput';
import './Login.css';

export default function Login() {

  return (
    <section className='login'>
      <Helmet>
        <title>Вход</title>
      </Helmet>

      <AuthPage
        title='Рады видеть!'
        name='login'
        submitBtnText='Войти'
        textBeforeLink='Ещё не зарегистрированы?'
        linkAnchor='Регистрация'
        linkUrl='/signup'
      >
				<AuthPageInput
          label='E-mail'
          type='email'
          name='email'
          id='email'
          placeholder='Ваш e-mail'
          errorText='Проверка email'
        />
        <AuthPageInput
          label='Пароль'
          type='password'
          name='password'
          id='password'
          placeholder='Ваш пароль'
          errorText='Проверка пароля'
        />
	  </AuthPage>
    </section>
  );
}
