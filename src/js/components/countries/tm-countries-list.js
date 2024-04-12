import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import { NavigationMixin } from '../../mixins/navigation-mixin';
import {isPositiveInteger} from '../../lib/validation/positive-integer';
import { infoIcon } from '@dile/icons';

export class TmCountriesList extends NavigationMixin(FeedbackMixin(LitElement)) {
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
      _routes: { type: Object },
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
customElements.define('tm-countries-list', TmCountriesList);
