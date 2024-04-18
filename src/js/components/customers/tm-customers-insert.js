import { LitElement, html, css } from 'lit';
import { TmCrudInsert } from '../crud/tm-crud-insert';

export class TmCustomersInsert extends TmCrudInsert {
  get formTemplate() {
    return html`<tm-customer-form id="form"></tm-customer-form>`
  }
}
customElements.define('tm-customers-insert', TmCustomersInsert);
