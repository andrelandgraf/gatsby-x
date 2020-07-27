import API from './api';
import { postRequest } from './request';

export const checkoutCourse = id =>
  postRequest(API.CHECKOUT.replace(':id', id), {});
