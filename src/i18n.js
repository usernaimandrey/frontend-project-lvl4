import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locale/index.js';

const instance = async () => {
  const i18nInstance = i18n.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      debug: false,
      resources,
    });
};

export default instance();
