import { LitElement, html, css } from 'lit';
import './tm-seconds-to-time';

export class TmTimeCounter extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
        border: 1px solid #303030;
        padding: 0.2rem 1rem;
        border-radius: 3rem;
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
    this.seconds = 0;
    this.running = false;
  }
  
  firstUpdated() {
    if(this.running) {
      setTimeout( () => this.start(), 1000)
    }
  }

  render() {
    return html`
      <span>
        <tm-seconds-to-time seconds="${this.seconds}"></tm-seconds-to-time>
      </span>  
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
