import { LitElement, html, css } from 'lit';
import { StateMixin } from '../../mixins/state-mixin';

export class CategoriesToState extends StateMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  constructor() {
    super();
    this.setState({categories: []})
  }

  firstUpdated() {
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
    this.refresh();
  }

  getSuccess(e) {
    console.log(e.detail.data);
    this.setState({categories: e.detail.data});
  }

  refresh() {
    this.ajaxget.generateRequest();
  }

  render() {
    return html`
      <tm-ajax
        id="ajaxget"
        url="api/categories"
        @ajax-success=${this.getSuccess}
        method="get"
      ></tm-ajax>
    `;
  }
}
customElements.define('categories-to-state', CategoriesToState);
