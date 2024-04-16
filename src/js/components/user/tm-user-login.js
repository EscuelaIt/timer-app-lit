import { LitElement, html, css } from 'lit';
import './tm-user-login-form';
import { TokenMixin } from '../../mixins/token-mixin';

export class TmUserLogin extends TokenMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <h2>Login de usuarios</h2>
      <tm-ajax-form
        id="elform"
        operation="insert"
        endpoint="/api/auth/login"
        actionLabel="Login"
        @save-success=${this.loginSuccess}
      >
        <tm-user-login-form id="form"></tm-user-login-form>
      </tm-ajax-form>  
    `;
  }

  loginSuccess(e) {
    this.dispatchToken(e.detail.token);
  }

}
customElements.define('tm-user-login', TmUserLogin);
