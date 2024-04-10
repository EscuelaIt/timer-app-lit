import { LitElement, html, css } from 'lit';
import './tm-countries-form';

export class TmCountriesCreate extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  render() {
    return html`
      <tm-ajax-form
        actionLabel="Crear"
        operation="insert"
        endpoint="api/countries/"
      >
        <tm-countries-form id="form"></tm-countries-form>
      </tm-ajax-form>
    `;
  }
  

}
customElements.define('tm-countries-create', TmCountriesCreate);
