import Axios from 'axios';

export const axiosCreator = (token = null) => {
  // console.log('soy axios creator', token);
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  };
  if(token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return Axios.create({
    baseURL: 'https://timer.escuelait.com',
    headers
  });
};