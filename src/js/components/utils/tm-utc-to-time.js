import { LitElement, html, css } from 'lit';

export class TmUtcToTime extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }
    `
  ];

  static get properties() {
    return {
      utc: { type: String }
    };
  }

  get localTime() {
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const date = new Date(this.utc);
    return date.toLocaleTimeString('es-ES', options);
  }

  render() {
    return html`
      <span class="time">${this.localTime}</span>
    `;
  }
}
customElements.define('tm-utc-to-time', TmUtcToTime);
