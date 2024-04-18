import { LitElement, html, css } from 'lit';
import '@dile/ui/components/select/select';

export class TmCustomerSelectField extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      customers: { type: Array },
      value: { type: String },
      name: { type: String },
      message: { type: String },
      errored: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.customers = [];
  }

  firstUpdated() {
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
    this.ajaxget.generateRequest();
  }

  render() {
    return html`
      <tm-ajax
        id="ajaxget"
        method="get"
        url="/api/customers"
        @ajax-success=${this.getSuccess}
      ></tm-ajax>
      <dile-select
        label="Cliente"
        value="${this.value}"
        message="${this.message}"
        ?errored=${this.errored}
        hideErrorOnInput
        @element-changed=${this.changeValue}
      >
        <select slot="select">
          <option value="">Seleccionar cliente</option>
          ${this.customers.map( customer => html`<option value="${customer.id}">${customer.name}</option>`)}
        </select>
      </dile-select>
    `;
  }

  changeValue(e) {
    console.log('changeValue', e.detail);
    this.value = e.detail.value
  }

  getSuccess(e) {
    this.customers = e.detail.data
  }
}
customElements.define('tm-customer-select-field', TmCustomerSelectField);
