import { ENDPOINTS } from 'constants/endpoints';
import { http } from './http.service';

const { comments } = ENDPOINTS;

export const getComments = async () => {
  return http.get(comments);
};

