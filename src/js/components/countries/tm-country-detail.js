import { LitElement, html, css } from 'lit';
import './tm-countries-update';

export class TmCountryDetail extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      countryId: { type: String },
      country: { type: Object },
      errored: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.errored = false;
  }

  render() {
    return html`
      ${this.errored 
        ? this.erroredTemplate
        : this.detailTemplate
      }
      <p>
        <a href="/countries">Volver</a>
      </p>
    `
  }

  get detailTemplate() {
    return html`
      <h1>${this.country?.name}</h1>
      <tm-countries-update
        relatedId="${this.countryId}"
        @tm-ajax-form-loaded=${this.countryLoaded}
        @tm-ajax-form-get-error=${this.countryError}
      ></tm-countries-update>
    `
  }

  get erroredTemplate() {
    return html`
      <h1>País inexistente</h1>
    `
  }
      
  countryLoaded(e) {
    this.country = e.detail.data
  }

  countryError(e) {
    this.errored = true;
  }
}
customElements.define('tm-country-detail', TmCountryDetail);
