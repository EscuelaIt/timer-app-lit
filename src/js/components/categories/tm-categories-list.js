import { LitElement, html, css } from 'lit';
import './tm-category-item';

export class TmCategoriesList extends LitElement {
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
      categories: { type: Array },
    };
  }

  constructor() {
    super();
    this.categories = [];
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
      ${this.categories.map( item => html`<tm-category-item .item=${item}></tm-category-item>`)}
    `;
  }

  getSuccess(e) {
    this.categories = e.detail.data;
  }

  refresh() {
    this.ajaxget.generateRequest();
  }

}
customElements.define('tm-categories-list', TmCategoriesList);
