import { LitElement, html, css } from 'lit';
import '@dile/ui/components/input/input';
import { DileForm } from '@dile/ui/mixins/form';

export class TmCustomerForm extends DileForm(LitElement) {
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
          label="Name"
          type="text" 
          name="name" 
          id="name" 
          placeholder="Name" 
          hideErrorOnInput
      ></dile-input>
      <dile-input
          label="Email"
          type="text" 
          name="email" 
          id="email" 
          placeholder="Correo e" 
          hideErrorOnInput
      ></dile-input>
      <dile-input
          label="Teléfono"
          type="text" 
          name="telephone" 
          id="telephone" 
          placeholder="Telf opcional" 
          hideErrorOnInput
      ></dile-input>
    `;
  }
}
customElements.define('tm-customer-form', TmCustomerForm);
