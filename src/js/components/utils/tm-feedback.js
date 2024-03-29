import { LitElement, html, css } from 'lit';
import '@dile/ui/components/toast/toast';

export class TmFeedback extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        --dile-toast-padding: 1.5rem;
      }
    `
  ];

  firstUpdated() {
    this.toast = this.shadowRoot.getElementById('myToast');
  }

  constructor() {
    super();
    this.positiveFeedbackHandler = this.positiveFeedback.bind(this);
    this.negativeFeedbackHandler = this.negativeFeedback.bind(this);
    this.neutralFeedbackHandler = this.neutralFeedback.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('negative-feedback', this.negativeFeedbackHandler);
    document.addEventListener('positive-feedback', this.positiveFeedbackHandler);
    document.addEventListener('neutral-feedback', this.neutralFeedbackHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('negative-feedback', this.negativeFeedbackHandler);
    document.removeEventListener('positive-feedback', this.positiveFeedbackHandler);
    document.removeEventListener('neutral-feedback', this.neutralFeedbackHandler);
  }

  render() {
    return html`
      <dile-toast id="myToast" duration="5000"></dile-toast>
    `;
  }

  showToast(text, status) {
    if(this.toast) {
      this.toast.open(text, status);
    } else {
      setTimeout( () => this.showToast(text, status), 100);
    }
  }

  negativeFeedback(e) {
    this.showToast(e.detail.msg, 'error')
  }
  positiveFeedback(e) {
    this.showToast(e.detail.msg, 'success')
  }
  neutralFeedback(e) {
    this.showToast(e.detail.msg, 'neutral')
  }

}
customElements.define('tm-feedback', TmFeedback);
