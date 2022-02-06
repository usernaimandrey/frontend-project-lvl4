// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  getUrlProduction: () => 'https://cryptic-basin-24595.herokuapp.com/',
  getUrlDev: () => 'http://localhost:5000/',
  getDataPath: () => [host, prefix, 'data'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  signUpPath: () => [host, prefix, 'signup'].join('/'),
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};
