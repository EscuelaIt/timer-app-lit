import { LitElement, html, css } from 'lit';
import '@dile/ui/components/input/input';
import { DileForm } from '@dile/ui/mixins/form';

export class TmCategoryForm extends DileForm(LitElement) {
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
    `;
  }
}
customElements.define('tm-category-form', TmCategoryForm);
