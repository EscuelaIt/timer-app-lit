import { LitElement, html, css } from 'lit';
import './tm-crud-item';

export class TmCrudList extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      endpoint: { type: String },
      items: { type: Array },
      itemDistribution: { type: Array },
    };
  }

  constructor() {
    super();
    this.items = [];
  }

  firstUpdated() {
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
    this.refresh();
  }

  render() {
    return html`
      <tm-ajax
        id="ajaxget"
        method="get"
        url="${this.endpoint}"
        @ajax-success=${this.getSuccess}
      ></tm-ajax>
      ${this.items.map( item => html`<tm-crud-item .itemDistribution=${this.itemDistribution} .item=${item}></tm-crud-item>`)}
    `;
  }

  getSuccess(e) {
    this.items = e.detail.data;
  }

  refresh() {
    this.ajaxget.generateRequest();
  }
}
customElements.define('tm-crud-list', TmCrudList);
