import '../css/style.css';
import './tm-app';
import './components/tm-time-counter';
import './components/utils/tm-ajax';
import './components/interface/tm-icon';

import Axios from 'axios';

console.log("hola");

export const axios = Axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  },
});


