import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import { StateMixin } from '../../mixins/state-mixin';

export class TmOpenInterval extends StateMixin(FeedbackMixin(LitElement)) {
  static styles = [
    css`
      :host {
        display: inline-block
      }
    `
  ];

  static get properties() {
    return {
      projectId: { type: String },
      opened: { type: Boolean },
    };
  }

  firstUpdated() {
    this.intervalCreationAjax = this.shadowRoot.getElementById('intervalCreationAjax');
  }

  stateChanged(state) {
    this.opened = state.openedInterval;
  }

  render() {
    return html`
      <tm-ajax
        id="intervalCreationAjax"
        url="/api/intervals"
        .data="${this.computeData(this.projectId)}"
        method="post"
        @ajax-success=${this.createIntervalSuccess}
        @ajax-error=${this.createIntervalError}
      ></tm-ajax>
      <dile-button ?disabled="${this.opened}" @click=${this.createInterval}>Abrir intervalo</dile-button>
    `;
  }

  createIntervalSuccess(e) {
    this.opened = true;
    this.positiveFeedback(e.detail.message)
    this.dispatchEvent(new CustomEvent('interval-opened', { 
      bubbles: true,
      composed: true
    }));
  }

  computeData(projectId) {
    return { project_id: projectId };
  }

  createInterval() {
    this.intervalCreationAjax.generateRequest();
  }

  createIntervalError(e) {
    this.negativeFeedback(e.detail.message);
  }

}
customElements.define('tm-open-interval', TmOpenInterval);
