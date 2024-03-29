import '../css/style.css';
import './tm-app';
import './components/tm-time-counter';

import Axios from 'axios';

console.log("hola");

export const axios = Axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json'
  },
});

axios.get('https://jsonplaceholder.typicode.com/todos/6')
  .then(function (response) {
    // manejar respuesta exitosa
    console.log(response);
  })
  .catch( error => {
    console.log(error);
  })
  .finally( () => {
    console.log('ok ha terminado');
  })
