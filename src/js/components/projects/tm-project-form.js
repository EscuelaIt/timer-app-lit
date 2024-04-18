import { LitElement, html, css } from 'lit';
import '@dile/ui/components/input/input';
import { DileForm } from '@dile/ui/mixins/form';
import '@dile/ui/components/textarea/textarea';
import '../customers/tm-customer-select-field';

export class TmProjectForm extends DileForm(LitElement) {
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
          label="Nombre del proyecto"
          type="text" 
          name="name" 
          id="name" 
          placeholder="Nombre" 
          hideErrorOnInput
      ></dile-input>
      <tm-customer-select-field
        name="customer_id"
      ></tm-customer-select-field>
      <dile-textarea
        label="Descripción"
        name="description"
        hideErrorOnInput
      ></dile-textarea>
    `;
  }
}
customElements.define('tm-project-form', TmProjectForm);
