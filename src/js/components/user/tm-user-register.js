import { LitElement, html, css } from 'lit';
import {FeedbackMixin} from '../../mixins/feedback-mixin';
import './tm-user-form';
import { TokenMixin } from '../../mixins/token-mixin';
import { StateMixin } from '../../mixins/state-mixin';

export class TmUserRegister extends StateMixin(TokenMixin(FeedbackMixin(LitElement))) {
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
      <h2>Registro de usuarios</h2>
      ${this.loggedIn
        ? html`<p>Ya estás registrado!!</p>`
        : html`
          <tm-ajax-form
            id="elform"
            operation="insert"
            endpoint="/api/auth/register"
            actionLabel="Registrarse"
            @save-success=${this.registerSuccess}
          >
            <tm-user-form id="form"></tm-user-form>
          </tm-ajax-form>
        `
      }
    `;
  }

  registerSuccess(e) {
    console.log(e.detail, 'register successssss', e.detail.token);
    this.dispatchToken(e.detail.token);
  }

  stateChanged(state) {
    console.log('componente registro', state);
    this.loggedIn = state.loggedIn;
  }
}
customElements.define('tm-user-register', TmUserRegister);
