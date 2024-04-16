import { LitElement, html, css } from 'lit';
import '@dile/ui/components/input/input';
import { DileForm } from '@dile/ui/mixins/form';

export class TmUserForm extends DileForm(LitElement) {
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
          label="Nombre"
          type="text" 
          name="name" 
          id="name" 
          placeholder="Escribe tu nombre" 
          value="Smith"
          hideErrorOnInput
      ></dile-input>
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
          label="Contraseña"
          type="password" 
          name="password" 
          id="password_register" 
          placeholder="Escribe tu contraseña" 
          value="1234qwer"
          hideErrorOnInput
      ></dile-input>
    `;
  }
}
customElements.define('tm-user-form', TmUserForm);
