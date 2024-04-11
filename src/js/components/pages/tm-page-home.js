import { LitElement, html, css } from 'lit';

export class TmPageHome extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <h1>Timer app</h1>
      <p>
        lorem ipsum... 
      </p>
    `;
  }
}
customElements.define('tm-page-home', TmPageHome);
