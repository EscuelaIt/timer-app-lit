import { LitElement, html, css } from 'lit';
import '../utils/tm-seconds-to-time';
import '../utils/tm-utc-to-time';

export class TmIntervalItem extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      section {
        display: grid;
        grid-template-columns: 30px auto 1fr;
        gap: 0.5rem;
      }
    `
  ];

  static get properties() {
    return {
      item: { type: Object }
    };
  }

  render() {
    return html`
      <section>
        <span>${this.item.id}</span>
        <span><tm-seconds-to-time seconds=${this.item.seconds_opened}></tm-seconds-to-time></span>
        <span><tm-utc-to-time utc="${this.item.start_time}"></tm-utc-to-time></span>
      </section>
    `
  }
}
customElements.define('tm-interval-item', TmIntervalItem);
