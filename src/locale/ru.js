export default {
  translation: {
    toast: {
      add: 'Канал успешно создан',
      rename: 'Канал переименован',
      remove: 'Канал удален',
      connectionErr: 'Проверьте подключение к сети!',
    },
    signInForm: {
      header: 'Войти',
      logIn: {
        name: 'Ваш ник',
        errLogIn: '',
      },
      password: {
        name: 'Пароль',
        errPas: 'Неверные имя пользователя или пароль',
      },
      validErr: 'Поле обязателно к заполнению',
      footer: 'Регистрация',
    },
    navBar: {
      button: 'Выход',
      navBrand: 'Hexlet Chat',
    },
    pageNotFound: {
      header: 'Страница не найдена',
      redirect: 'Вернутся на главную страницу',
      networkErr: 'Проблеммы с сетью или пользователь не авторизован',
    },
    formMessage: 'Введите сообщение...',
    sideBar: 'Каналы',
    spiner: 'Загрузка...',
    messageBox: {
      key_one: '{{count}} сообщенe',
      key_few: '{{count}} сообщения',
      key_many: '{{count}} сообщений',
    },
    modal: {
      addChannel: 'Добавить канал',
      button: {
        save: 'Отправить',
        close: 'Отменить',
      },
      err: {
        network: 'Нет соединения',
        require: 'Поле не может быть пустым',
        uniq: 'Имя должно быть уникальным',
        minMax: 'Название должно содержать от 3 до 20 символов',
      },
    },
    newChannel: {
      del: 'Удалить',
      rename: 'Переименовать',
    },
    removeModal: {
      header: 'Удалить?',
      body: 'Уверены?',
      buttonClose: 'Отмена',
      buttonOk: 'Удалить',
    },
    rename: 'Переименовать канал',
    signUpForm: {
      header: 'Регистрация',
      name: 'Имя пользователя',
      password: 'Пароль',
      confirmPass: 'Подтвердите пароль',
      button: 'Зарегистрироваться',
      validErr: {
        req: 'Это поле обязательное',
        minMaxLog: 'Имя должно содержать от 3 до 20 символов',
        minPass: 'Не менее 6 символов',
        confirm: 'Пароли должны совпадать',
        conflict: 'Такой пользователь уже существует',
      },
    },
  },
};
