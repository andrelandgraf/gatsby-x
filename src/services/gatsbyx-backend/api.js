import { ENV } from '../../enums';

const { apiUrl } = ENV;

console.log('basepath', apiUrl);

const API = {
  TOKEN: `${apiUrl}/auth/token`,
  REGISTER: `${apiUrl}/users`,
  ME: `${apiUrl}/users/me`,
  CHANGEPW: `${apiUrl}/users/me/password`,
  CHECKOUT: `${apiUrl}/purchases/item/:id`,
};

export default Object.freeze(API);
