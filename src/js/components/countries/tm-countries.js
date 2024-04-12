import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import { NavigationMixin } from '../../mixins/navigation-mixin';
import { ifDefined } from 'lit/directives/if-defined.js';
import './tm-countries-create';
import '@dile/ui/components/card/card';
import { Routes, Router } from '@lit-labs/router';


export class TmCountries extends NavigationMixin(FeedbackMixin(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      _routes: { type: Object },
    };
  }

  constructor() {
    super();
    this.createRoutes();
  }

  render() {
    return html`
      <h1>Países</h1>
      <p>
        <a href="/countries/crear"><dile-button>Crear país</dile-button></a>
      </p>
      <main>
        ${this._routes.outlet()}
      </main>

      
      
    `;
  }

  createRoutes() {
    this._routes = new Routes(this, [
      {
        path: '/countries',
        render: () => html`<tm-countries-list></tm-countries-list>`,
        enter: async () => {
          document.title = 'Listado de país';
          await import('./tm-countries-list');
        },
      },
      {
        path: '/countries/crear',
        render: () => html`<tm-countries-create></tm-countries-create>`,
      },
      {
        path: '/countries/:id',
        render: ({id}) => html`<tm-country-detail countryId=${ifDefined(id)}></tm-country-detail>`,
        enter: async () => {
          document.title = 'Detalle de país';
          await import('./tm-country-detail');
        },
      },
      {
        path: '/countries*',
        render: () => html`<tm-page-404></tm-page-404>`,
        enter: () => this.goToUrl('/404')
      }
    ]);
  }
}
customElements.define('tm-countries', TmCountries);
