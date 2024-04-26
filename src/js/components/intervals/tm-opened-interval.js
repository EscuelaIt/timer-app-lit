import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import { StateMixin } from '../../mixins/state-mixin';
import '../utils/tm-time-counter';

export class TmOpenedInterval extends StateMixin(FeedbackMixin(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
        margin-bottom: 1.5rem;
      }
      .closebutton {
        --dile-button-background-color: var(--primary-color);
      }
      section {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    `
  ];

  static get properties() {
    return {
      openedData: { type: Object },
      loggedIn: { type: Boolean },
      opened: { type: Boolean },
      opendedInterval: { type: Object },
    };
  }

  constructor() {
    super();
    this.openedData = {
      opened: true,
    }
  }

  firstUpdated() {
    this.intervalCloseAjax = this.shadowRoot.getElementById('intervalCloseAjax');
    this.intervalOpenedAjax = this.shadowRoot.getElementById('intervalOpenedAjax');
  }

  stateChanged(state) {
    let lastLoginState = this.loggedIn;
    this.loggedIn = state.loggedIn;
    if(lastLoginState != this.loggedIn) {
      this.refresh();
    }
  }  

  render() {
    return html`
      <tm-ajax
        id="intervalCloseAjax"
        url="/api/intervals/finalize"
        method="get"
        @ajax-success=${this.closedIntervalSuccess}
        @ajax-error=${this.closedIntervalError}
      ></tm-ajax>
      <tm-ajax
        id="intervalOpenedAjax"
        url="/api/intervals"
        .data=${this.openedData}
        method="get"
        @ajax-success=${this.openedIntervalSuccess}
      ></tm-ajax>
      ${this.opened
        ? this.openedIntervalTemplate
        : ''
      }
    `;
  }

  get openedIntervalTemplate() {
    return html`
      <section>
        <dile-button class="closebutton" @click=${this.closeInterval}>Cerrar intervalo</dile-button>
        <tm-time-counter running seconds="${this.opendedInterval.seconds_opened}"></tm-time-counter>
        ${this.opendedInterval.project
          ? html`<a href="/proyectos/${this.opendedInterval.project.id}">${this.opendedInterval.project.name}</a>`
          : ''
        }
      </section>
    `
  }

  openedIntervalSuccess(e) {
    if(e.detail.data.length > 0) {
      console.log('openedIntervalSuccess', e.detail);
      this.opened = true;
      this.opendedInterval = e.detail.data[0];
      this.setState({
        openedInterval: true,
      })
    }
  }

  refresh() {
    console.log('voy a refrescar...');
    this.intervalOpenedAjax.generateRequest();
  }

  closeInterval() {
    this.intervalCloseAjax.generateRequest();
  }

  closedIntervalSuccess() {
    this.positiveFeedback('Intervalo cerrado');
    this.opened = false;
    this.opendedInterval = null;
    this.setState({
      openedInterval: false,
    })
  }

  closedIntervalError(e) {
    this.negativeFeedback(e.detail.message);
  }
}
customElements.define('tm-opened-interval', TmOpenedInterval);
