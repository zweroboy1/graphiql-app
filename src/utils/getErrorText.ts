interface ErrorMessages {
  [key: string]: { [key: string]: string };
}

const errorDictionary: ErrorMessages = {
  'Firebase: Error (auth/email-already-in-use).': {
    en: 'This email is already in use!',
    ru: 'Такой почтовый ящик уже используется!',
  },
  'Firebase: Error (auth/network-request-failed).': {
    en: 'Network request is failed!',
    ru: 'Не получается подключиться к серверу!',
  },
  'Firebase: Error (auth/invalid-credential).': {
    en: 'Your password or email is invalid!',
    ru: 'Нет пользователя с такими логином/паролем!',
  },
  FETCH_ERROR: {
    en: `Invalid API endpoint! If you're sure that it's a working endpoint, you can try entering https://corsproxy.io?`,
    ru: `Неверный API-эндпоинт! Если уверены, что это рабочий эндпоинт, попробуйте ввести https://corsproxy.io?`,
  },
};

const getDefaultErrorMessage = (langCode: string): string => {
  if (langCode === 'ru') return 'Что-то пошло не так!';
  return 'Something went wrong!';
};

export const getErrorText: (
  errorCode: string | null,
  langCode: string,
  argument?: string | null
) => string = (errorCode, langCode, argument = null) => {
  if (!errorCode || !errorDictionary[errorCode]) {
    return getDefaultErrorMessage(langCode);
  }

  return errorDictionary[errorCode][langCode] + (argument ? argument : '');
};
