import { html, css } from 'lit';
import { TmCrud } from '../crud/tm-crud';
import './tm-customers-insert';
import './tm-customers-edit';
import './tm-customer-form';
import '../user/tm-user-validator';

export class TmCustomers extends TmCrud {
  
  constructor() {
    super();
    this.endpoint = "/api/customers";
    this.title = "Clientes";
    this.itemDistribution = [
      {
        name: "id", 
        css: "width: 30px; min-width: 30px;",
      },
      {
        name: "name",
        css: "flex-grow: 1; font-weight: bold;",
      }
    ];
  }

  render() {
    return html`
      <tm-user-validator>
        ${super.render()}
      </tm-user-validator>
    `
  }

  get insertTemplate() {
    return html`
      <tm-customers-insert
        id="elinsert"
        endpoint="${this.endpoint}"
      ></tm-customers-insert>
    `
  }

  get editTemplate() {
    return html`
      <tm-customers-edit
        id="eledit"
        endpoint="${this.endpoint}"
      ></tm-customers-edit>
    `
  }
}
customElements.define('tm-customers', TmCustomers);
