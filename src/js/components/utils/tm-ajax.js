import { LitElement, html, css } from 'lit';
import { axios } from '../../lib/axios';

export class TmAjax extends LitElement {
  
  static get properties() {
    return {
      url: { type: String },
      data: { type: Object },
      method: { type: String },
    };
  }

  constructor() {
    super();
    this.url = '';
    this.data = {};
    this.method = "post"
  }

  generateRequest() {
    let request;
    switch(this.method.toLowerCase().trim()) {
      case 'get':
        request = axios.get(this.url, {
          params: this.data
        });
        break;
      case 'post':
        request = axios.post(this.url, this.data);
        break;
      case 'put':
        request = axios.put(this.url, this.data);
        break;
      case 'delete':
        request = axios.delete(this.url, this.data);
        break;
      case 'patch':
        request = axios.patch(this.url, this.data);
        break;
      default:
        throw new Error('Has escrito un método no soportado al usar el componente tm-ajax');
    }
    request
      .then( response => {
        if(response.status == 200) {
          let data = response.data;
          this.sendSuccess(data);
        } else {
          throw new Error('Código de respuesta no esperado');
        }
      })
      .catch(error => {
        this.describeError(error);
      });
  }

  sendSuccess(data) {
    this.dispatchEvent(new CustomEvent('ajax-success', {
      bubbles: true,
      composed: true,
      detail: data
    }));
  }
  sendError(message, errors) {
    this.dispatchEvent(new CustomEvent('ajax-error', {
      bubbles: true,
      composed: true,
      detail: {
        message,
        errors,
      }
    }));
  }

  describeError(error) {
    let message = '';
    let errors = {};
    if(error.response) {
      const status = error.response.status;
      //console.log('error recibido por axios', error);
      switch(status) {
        case 500:
          message = 'Error en el servidor, intenta más tarde';
          break;
        case 401: 
        case 400:
          message = error.response.data.message;
          errors = error.response.data.errors;
          break;
        case 403:
          message = 'Operación no autorizada';
          break;
        default: 
        message = 'Error en la solicitud';
      }
    } else {
      message = error;
    }
    this.sendError(message, errors);
  }
}
customElements.define('tm-ajax', TmAjax);
