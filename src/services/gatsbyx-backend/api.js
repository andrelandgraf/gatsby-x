import { ENV } from '../../enums';

const { apiUrl } = ENV;

const API = {
  TOKEN: `${apiUrl}/auth/token`,
  REGISTER: `${apiUrl}/users`,
  ME: `${apiUrl}/users/me`,
  CHANGEPW: `${apiUrl}/users/me/password`,
  CHECKOUT: `${apiUrl}/purchases/items/:id`,
};

export default Object.freeze(API);
