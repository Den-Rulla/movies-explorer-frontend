import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AuthPage from '../AuthPage/AuthPage';
import AuthPageInput from '../AuthPageInput/AuthPageInput';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './Register.css';

export default function Register({ handleRegister, serverAnswer, setServerAnswer, isLoading }) {

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
    handleRegister({
			name: values.name,
			email: values.email,
			password: values.password,
		});
  }

  return (
    <section className='register'>
      <Helmet>
        <title>Регистрация</title>
      </Helmet>

      <AuthPage
        title='Добро пожаловать!'
        name='register'
        submitBtnText={`${!isLoading ? 'Зарегистрироваться' : 'Регистрируем...'}`}
        textBeforeLink='Уже зарегистрированы?'
        linkAnchor='Войти'
        linkUrl='/signin'
        isDisabled={!isValid || isLoading}
        onSubmit={handleSubmit}
        serverAnswer={serverAnswer}
      >
        <AuthPageInput
          label='Имя'
          type='text'
          name='name'
          id='name'
          placeholder='Например, Иван'
          minLength={2}
          maxLength={30}
          errorText={errors.name || ''}
          value={values.name || ''}
          errClass={errors.name || ''}
          onChange={handleChange}
        />
        <AuthPageInput
          label='E-mail'
          type='email'
          name='email'
          id='email'
          placeholder='pochta@yandex.ru'
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
          placeholder='Сложный пароль'
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
