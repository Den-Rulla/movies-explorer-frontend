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
	children 
}) {

	function handleSubmit(e) {
    e.preventDefault();
  }

	return (
    <div className='auth-page'>
			<Logo />
      <h1 className='auth-page__title'>{title}</h1>
      <form className='auth-page__form' name={name} id={name} onSubmit={handleSubmit}>
				{children}
			</form>
			<button className='auth-page__form-btn' type='submit' form={name}>{submitBtnText}</button>
			<div className='auth-page__link-cover'>
				<p className='auth-page__link-text'>{textBeforeLink}</p>
				<Link className='auth-page__link' to={linkUrl}>{linkAnchor}</Link>
			</div>
    </div>
  );
}
