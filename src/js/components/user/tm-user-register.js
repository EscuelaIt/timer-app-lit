import { LitElement, html, css } from 'lit';
import {FeedbackMixin} from '../../mixins/feedback-mixin';
import './tm-user-form';
import { TokenMixin } from '../../mixins/token-mixin';

export class TmUserRegister extends TokenMixin(FeedbackMixin(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <h2>Registro de usuarios</h2>
      <tm-ajax-form
        id="elform"
        operation="insert"
        endpoint="/api/auth/register"
        actionLabel="Registrarse"
        @save-success=${this.registerSuccess}
      >
        <tm-user-form id="form"></tm-user-form>
      </tm-ajax-form>
    `;
  }

  registerSuccess(e) {
    console.log(e.detail, 'register successssss', e.detail.token);
    this.dispatchToken(e.detail.token);
  }
}
customElements.define('tm-user-register', TmUserRegister);
