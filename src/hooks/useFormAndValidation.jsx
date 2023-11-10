import {useState, useCallback} from 'react';

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(false);
  const regExpEmail = /^\S+@\S+\.\S+$/;

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsValid(e.target.closest('form').checkValidity());
  };

  const handleChangeEmail = (e) => {
    handleChange(e);

    const {name, value} = e.target;

    if (name === 'email' && !regExpEmail.test(value)) {
      setIsValid(false);
      setErrors((errors) => {
        return {
          ...errors, email: 'Неправильный формат почты. Пример: pochta@yandex.ru',
        };
      });
    }
  }

  const handleChangeSearch = (e) => {
    handleChange(e);

    const {name, value} = e.target;

    if (name === 'search' && value === '') {
      setIsValid(false);
      setErrors((errors) => {
        return {
          ...errors, search: 'Нужно ввести ключевое слово',
        };
      });
    }
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, setValues, handleChange, handleChangeEmail, handleChangeSearch, errors, setErrors, isValid, setIsValid, resetForm };
}
