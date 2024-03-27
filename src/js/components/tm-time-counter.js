import { LitElement, html, css } from 'lit';
import './tm-seconds-to-time';

export class TmTimeCounter extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        border: 1px solid #303030;
        padding: 1rem;
      }
      span {
        color: red;
      }
    `
  ];

  static get properties() {
    return {
      seconds: { type: Number },
      running: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.seconds = 10;
    this.running = false;
  }

  render() {
    return html`
      <span>
        <tm-seconds-to-time seconds="${this.seconds}"></tm-seconds-to-time>
      </span>  
      <sl-button 
        @click=${this.start}
        variant="neutral"  
        size="small"
        pill
      >Start</sl-button>
      <sl-button 
        @click=${this.stop}
        variant="neutral"  
        size="small"
        pill
      >Stop</sl-button>
    `;
  }

  start() {
    this.running = true;
    this.timeCount();
  }

  stop() {
    this.running = false;
  }

  timeCount() {
    if(this.running) {
      this.seconds++;
      setTimeout(() => this.timeCount(), 1000);
    }
  }
}
customElements.define('tm-time-counter', TmTimeCounter);
