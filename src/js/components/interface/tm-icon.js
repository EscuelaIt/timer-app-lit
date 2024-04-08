import { LitElement, html, css } from 'lit';
import { icons } from '../../icons/icons';

export class TmIcon extends LitElement {
  static styles = [
    css`
      :host {
        display: inline-block;
      }
      span {
        display: flex;
        align-items: center;
      }
    `
  ];

  static get properties() {
    return {
      icon: { type: String }
    };
  }

  render() {
    return html`
    <span>
      <dile-icon .icon="${this.computeIcon(this.icon)}"></dile-icon>
    </span>
    `;
  }

  computeIcon(icon) {
    return icons[icon];
  }
}
customElements.define('tm-icon', TmIcon);
