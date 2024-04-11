import { LitElement, html, css } from 'lit';

export class TmPage404 extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
    <h1>404</h1>
    <p>Página no encontrada</p>
    `;
  }
}
customElements.define('tm-page-404', TmPage404);
