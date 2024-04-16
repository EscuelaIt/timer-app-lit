import { LitElement, html, css } from 'lit';
import './tm-user-login-form';
import { TokenMixin } from '../../mixins/token-mixin';
import { StateMixin } from '../../mixins/state-mixin';

export class TmUserLogin extends StateMixin(TokenMixin(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      loggedIn: { type: Boolean }
    };
  }

  render() {
    return html`
      <h2>Login de usuarios</h2>
      ${this.loggedIn
        ? html`<p>Ya estás logueado!!</p>`
        : html`
          <tm-ajax-form
            id="elform"
            operation="insert"
            endpoint="/api/auth/login"
            actionLabel="Login"
            @save-success=${this.loginSuccess}
          >
            <tm-user-login-form id="form"></tm-user-login-form>
          </tm-ajax-form>  
        `
      }
    `;
  }

  stateChanged(state) {
    this.loggedIn = state.loggedIn;
  }

  loginSuccess(e) {
    this.dispatchToken(e.detail.token);
  }

}
customElements.define('tm-user-login', TmUserLogin);
