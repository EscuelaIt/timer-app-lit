import { LitElement, html, css } from 'lit';
import { TmCrudEdit } from '../crud/tm-crud-edit';

export class TmCustomersEdit extends TmCrudEdit {
  get formTemplate() {
    return html`<tm-customer-form id="form"></tm-customer-form>`
  }
}
customElements.define('tm-customers-edit', TmCustomersEdit);
