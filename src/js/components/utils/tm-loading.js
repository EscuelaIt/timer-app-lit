import { LitElement, html, css } from 'lit';
import '@dile/ui/components/spinner/spinner-modal'

export class TmLoading extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      active: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.active = false;
    this.startLoadingFeedbackHandler = this.startLoadingFeedback.bind(this);
    this.stopLoadingFeedbackHandler = this.stopLoadingFeedback.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('stop-loading-feedback', this.stopLoadingFeedbackHandler);
    document.addEventListener('start-loading-feedback', this.startLoadingFeedbackHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('stop-loading-feedback', this.stopLoadingFeedbackHandler);
    document.removeEventListener('start-loading-feedback', this.startLoadingFeedbackHandler);
  }

  render() {
    return html`
      <dile-spinner-modal ?active=${this.active}></dile-spinner-modal>
    `;
  }

  startLoadingFeedback() {
    //console.log('inicio de carga');
    this.active = true;
  }

  stopLoadingFeedback() {
    this.active = false;
  }
}
customElements.define('tm-loading', TmLoading);
