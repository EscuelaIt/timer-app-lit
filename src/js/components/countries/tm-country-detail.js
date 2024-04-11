import { LitElement, html, css } from 'lit';

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
    };
  }

  render() {
    return html`
      <h1>${this.country?.name}</h1>
      <tm-countries-update
        relatedId="${this.countryId}"
        @tm-ajax-form-loaded=${this.countryLoaded}
      ></tm-countries-update>
      <p>
        <a href="/countries">Volver</a>
      </p>
    `;
  }

  countryLoaded(e) {
    this.country = e.detail.data
  }
}
customElements.define('tm-country-detail', TmCountryDetail);
