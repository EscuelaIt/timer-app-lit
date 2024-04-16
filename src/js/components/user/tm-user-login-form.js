import { LitElement, html, css } from 'lit';
import '@dile/ui/components/input/input';
import { DileForm } from '@dile/ui/mixins/form';

export class TmUserLoginForm extends DileForm(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <dile-input
          label="Email"
          type="email" 
          name="email" 
          id="email_register" 
          placeholder="Email" 
          value="x@example.com"
          hideErrorOnInput
      ></dile-input>
      <dile-input
          label="Password"
          type="password" 
          name="password" 
          id="password_register" 
          placeholder="Password" 
          value="1234qwer"
          hideErrorOnInput
      ></dile-input>
    `;
  }
}
customElements.define('tm-user-login-form', TmUserLoginForm);
