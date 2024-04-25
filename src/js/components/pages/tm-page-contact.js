import { LitElement, html, css } from 'lit';

export class TmPageContact extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  constructor() {
    super();
    document.title = 'Contacta con nosotros'  
  }

  render() {
    return html`
      <h1>Contacto</h1>
      <p>Contacta con nosotros...</p>
      <ul>
        <li>
          <a href="/categorias">Categorías</a>
        </li>
        <li>
          <a href="/countries">Paises</a>
        </li>
      </ul>
    `;
  }
}
customElements.define('tm-page-contact', TmPageContact);
