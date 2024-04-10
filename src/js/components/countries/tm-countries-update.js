import { LitElement, html, css } from 'lit';

export class TmCountriesUpdate extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      relatedId: { type: String },
    };
  }

  render() {
    return html`
      <tm-ajax-form
        actionLabel="Actualizar"
        operation="update"
        endpoint="api/countries"
        relatedId="${this.relatedId}"
        loadOnInit
      >
        <tm-countries-form id="form"></tm-countries-form>
      </tm-ajax-form>
    `;
  }
}
customElements.define('tm-countries-update', TmCountriesUpdate);
