import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import { infoIcon } from '@dile/icons';
import './tm-countries-create';
import './tm-countries-update';

export class TmCountries extends FeedbackMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
        --dile-icon-color: var(--primary-color);
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
    this.startLoading();
    this.ajaxget.generateRequest();
  }

  render() {
    return html`

      <tm-countries-create
        @save-success="${this.refresh}"
      ></tm-countries-create>

      <hr>

      <tm-countries-update
        @save-success="${this.refresh}"
        relatedId="10"
      ></tm-countries-update>


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
      <p><dile-icon .icon="${infoIcon}"></dile-icon> Mostramos el listado de ${this.countries.length} países</p>
      <ul>
        ${this.countries.map( country => html`<li><b>${country.name}</b> - ${country.continent}</li>`)}
      </ul>  
    `
  }

  doAjaxSuccess(e) {
    this.stopLoading();
    console.log(e.detail);
    //this.positiveFeedback(e.detail.message);
    this.countries = e.detail.data;
  }

  doAjaxError(e) {
    this.stopLoading();
    console.log('doajaxerror', e.detail);
    this.negativeFeedback(e.detail.message);
  }

  refresh() {
    this.startLoading();
    this.ajaxget.generateRequest();
  }
}
customElements.define('tm-countries', TmCountries);
