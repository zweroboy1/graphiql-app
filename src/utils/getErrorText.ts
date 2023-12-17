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
    ru: 'Нельзя зайти с такими логином/паролем!',
  },
};

const getDefaultErrorMessage = (langCode: string): string => {
  if (langCode === 'ru') return 'Что-то пошло не так!';
  return 'Something went wrong!';
};

export const getErrorText: (
  errorCode: string | null,
  langCode: string
) => string = (errorCode, langCode) => {
  if (!errorCode || !errorDictionary[errorCode]) {
    return getDefaultErrorMessage(langCode);
  }

  return errorDictionary[errorCode][langCode];
};
