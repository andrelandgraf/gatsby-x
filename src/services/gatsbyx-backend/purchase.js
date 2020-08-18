import API from './api';
import { postRequest } from './request';

export const checkout = id => postRequest(API.CHECKOUT.replace(':id', id), {});
