import './AuthPageInput.css';

export default function AuthPageInput({
	label,
	type,
	name,
	id,
	defaultValue,
	minLength,
	maxLength,
  placeholder,
	errorText
}) {
  return (
    <div className='auth-page-input'>
			<label className='auth-page-input__label'
				htmlFor={id}>
				{label}
			</label>
			<input className='auth-page-input__input'
				type={type}
				name={name}
				id={id}
        minLength={minLength}
        maxLength={maxLength}
        defaultValue={defaultValue}
        placeholder={placeholder}
				required
			/>
			<span className='auth-page-input-error'>
				{errorText}
			</span>
		</div>
  );
}
