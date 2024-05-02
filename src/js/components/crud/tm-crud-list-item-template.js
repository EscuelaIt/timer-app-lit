import { LitElement, html, css } from 'lit';
import './tm-crud-item-template';

export class TmCrudListItemTemplate extends LitElement {
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
      moreActionsTemplate: { type: Object },
      itemTemplate: { type: Object },
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
      ${this.items.map( item => html`<tm-crud-item-template .moreActionsTemplate=${this.moreActionsTemplate} .itemTemplate=${this.itemTemplate} .item=${item}></tm-crud-item-template>`)}
    `;
  }

  getSuccess(e) {
    this.items = e.detail.data;
  }

  refresh() {
    this.ajaxget.generateRequest();
  }
}
customElements.define('tm-crud-list-item-template', TmCrudListItemTemplate);
