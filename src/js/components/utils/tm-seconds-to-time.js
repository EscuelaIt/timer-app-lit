import { LitElement, html, css } from 'lit';

export class TmSecondsToTime extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      seconds: { type: Number }
    };
  }

  render() {
    return html`${this.convertTime(this.seconds)}`;
  }

  convertTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return (hours > 0) 
      ? `${hours}:${formattedMinutes}:${formattedSeconds}`
      : `${formattedMinutes}:${formattedSeconds}`
  }
}
customElements.define('tm-seconds-to-time', TmSecondsToTime);
