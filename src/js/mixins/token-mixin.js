export const TokenMixin = (Superclass) => class extends Superclass {
  
  get token() {
    return window.localStorage.getItem('token')
  }

  set token(token) {
    window.localStorage.setItem('token', token);
  }

  storeToken(token) { 
    this.token = token;
  }  

  removeToken(token) {
    window.localStorage.removeItem('token');
  }

  dispatchToken(token) {
    this.dispatchEvent(new CustomEvent('new-token-issued', { 
      bubbles: true,
      composed: true,
      detail: {
        token,
      }
    }));
  }
}