import { LitElement, html, css } from 'lit';
import {FeedbackMixin} from '../../mixins/feedback-mixin';

export class TmUserRegister extends FeedbackMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <h2>Registro de usuarios...</h2>
      <button @click=${this.showError}>mostrar error</button>
      <button @click=${this.showSuccess}>mostrar success</button>
    `;
  }

  showError() {
    this.negativeFeedback('ui no ha funcionado....');
  }
  showSuccess() {
    this.positiveFeedback('ah que bien!!!');
  }
}
customElements.define('tm-user-register', TmUserRegister);
