import { LitElement, html, css } from 'lit';

export class TmPageContact extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <h1>Contacto</h1>
      <p>Contacta con nosotros...</p>
    `;
  }
}
customElements.define('tm-page-contact', TmPageContact);
