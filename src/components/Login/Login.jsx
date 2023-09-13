import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthPage from '../AuthPage/AuthPage';
import AuthPageInput from '../AuthPageInput/AuthPageInput';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './Login.css';

export default function Login({ handleLogin, serverAnswer, setServerAnswer, isLoading }) {

  const {values, handleChange, handleChangeEmail, errors, isValid, resetForm } = useFormAndValidation();

  useEffect(() => {
		resetForm();
	}, [resetForm]);

  useEffect(() => {
		setServerAnswer('');
	}, [setServerAnswer]);

	function handleSubmit(e) {
    e.preventDefault();
    setServerAnswer('');
    handleLogin({
			email: values.email,
			password: values.password,
		});
  }

  return (
    <section className='login'>
      <Helmet>
        <title>Вход</title>
      </Helmet>

      <AuthPage
        title='Рады видеть!'
        name='login'
        submitBtnText={`${!isLoading ? 'Войти' : 'Выполняется вход...'}`}
        textBeforeLink='Ещё не зарегистрированы?'
        linkAnchor='Регистрация'
        linkUrl='/signup'
        isDisabled={!isValid || isLoading}
        onSubmit={handleSubmit}
        serverAnswer={serverAnswer}
      >
				<AuthPageInput
          label='E-mail'
          type='email'
          name='email'
          id='email'
          placeholder='Ваш e-mail'
          errorText={errors.email || ''}
          value={values.email || ''}
          errClass={errors.email || ''}
          onChange={handleChangeEmail}
        />
        <AuthPageInput
          label='Пароль'
          type='password'
          name='password'
          id='password'
          placeholder='Ваш пароль'
          minLength={6}
          maxLength={20}
          errorText={errors.password || ''}
          value={values.password || ''}
          errClass={errors.password || ''}
          onChange={handleChange}
        />
	  </AuthPage>
    </section>
  );
}
