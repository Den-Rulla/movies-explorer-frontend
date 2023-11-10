import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './AuthPage.css';

export default function AuthPage({
	title,
	name,
	submitBtnText,
	textBeforeLink,
	linkAnchor,
	linkUrl,
	children,
  isDisabled,
  onSubmit,
	serverAnswer
}) {

	return (
    <div className='auth-page'>
			<Logo />
      <h1 className='auth-page__title'>{title}</h1>
      <form className={`auth-page__form auth-page__form_type_${name}`} name={name} id={name} onSubmit={onSubmit} noValidate>
				{children}
			</form>
      <span className='auth-page__server-answer'>{serverAnswer}</span>
			<button className={`auth-page__form-btn ${isDisabled ? 'auth-page__form-btn_type_disabled' : ''}`} type='submit' disabled={isDisabled} form={name}>{submitBtnText}</button>
			<div className='auth-page__link-cover'>
				<p className='auth-page__link-text'>{textBeforeLink}</p>
				<Link className='auth-page__link' to={linkUrl}>{linkAnchor}</Link>
			</div>
    </div>
  );
}
