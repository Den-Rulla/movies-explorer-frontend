export const VIEWPORTS = {
  MOBILE: 635,
  HD: 1134,
};

export const errorsList = {
    'Ошибка: 400': {
      message: 'Ошибка валидации. Проверьте корректность заполненных данных'
    },
    'Ошибка: 401': {
      message: 'Вы ввели неправильный логин или пароль'
    },
    'Ошибка: 409': {
      message: 'Пользователь с таким email уже существует'
    },
    'Ошибка 409': {
      message: 'Пользователь с таким email уже существует'
    },
    'Ошибка: 429': {
      message: 'Превышен лимит запросов'
    },
    'Ошибка 429': {
      message: 'Превышен лимит запросов'
    },
  }

  export const REGISTER_ERROR = 'При регистрации пользователя произошла ошибка';
  export const AUTORIZE_ERROR = 'При авторизации произошла ошибка';
  export const UPDATE_ERROR = 'При обновлении профиля произошла ошибка';
  export const SERVER_ERROR = 'Ошибка сервера';

  export const REGISTER_OK = 'Вы зарегистрировались';
  export const AUTORIZE_OK = 'Вы вошли в систему';
  export const UPDATE_TOOLTIP_OK = 'Данные сохранены';
  export const UPDATE_OK = 'Данные пользователя успешно изменены';
