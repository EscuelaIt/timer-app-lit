import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../mixins/feedback-mixin';

export class TmCountries extends FeedbackMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      countries: { type: Array },
    };
  }

  constructor() {
    super();
    this.countries = [];
  }

  firstUpdated() {
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
    this.ajaxget.generateRequest();
  }

  render() {
    return html`
      <tm-ajax
        id="ajaxget"
        url="https://timer.escuelait.com/api/countries"
        method="get"
        @ajax-success=${this.doAjaxSuccess}
        @ajax-error=${this.doAjaxError}
      ></tm-ajax>
      ${this.countries.length == 0
        ? html`<p>El array está vacío</p>`
        : this.countriesTemplate
      }
    `;
  }

  get countriesTemplate() {
    return html`
      <p>Mostramos el listado de ${this.countries.length} países</p>
      <ul>
        ${this.countries.map( country => html`<li><b>${country.name}</b> - ${country.continent}</li>`)}
      </ul>  
    `
  }

  doAjaxSuccess(e) {
    console.log(e.detail);
    this.positiveFeedback(e.detail.message);
    this.countries = e.detail.data;
  }

  doAjaxError(e) {
    console.log('doajaxerror', e.detail);
    this.negativeFeedback(e.detail);
  }
}
customElements.define('tm-countries', TmCountries);
