import axios from 'axios';
import { hostUrl } from './urls';

const api = axios.create({
  baseURL: hostUrl,
});
export default api;