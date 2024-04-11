import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import { NavigationMixin } from '../../mixins/navigation-mixin';
import { infoIcon } from '@dile/icons';
import './tm-countries-create';
import '@dile/ui/components/card/card';

import {isPositiveInteger} from '../../lib/validation/positive-integer';

export class TmCountries extends NavigationMixin(FeedbackMixin(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
        --dile-icon-color: var(--primary-color);
      }
      dile-card {
        margin-bottom: 1.5rem;
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

      <dile-card>
        <dile-input id="countryId" label="Id país" hideErrorOnInput></dile-input>
        <dile-button @click=${this.goToCountry}>Ir</dile-button>
      </dile-card>

      <tm-countries-create
        @save-success="${this.refresh}"
      ></tm-countries-create>

      <hr>

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
        ${this.countries.map( country => html`
          <li>${country.id}.- <b><a href="/countries/${country.id}">${country.name}</a></b> - ${country.continent}</li>
        `)}
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

  goToCountry() {
    let input = this.shadowRoot.getElementById('countryId');
    let value = input.value;
    if(! isPositiveInteger(value)) {
      input.errored = true;
      input.message = "No es un id válido";
    } else {
      this.goToUrl('/countries/' + value);
    }
  }
}
customElements.define('tm-countries', TmCountries);
