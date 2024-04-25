import { LitElement, html, css } from 'lit';
import '@dile/ui/components/nav/nav';
import '@dile/ui/components/button/button';
import '@dile/ui/components/menu-hamburger/menu-hamburger';
import './components/utils/tm-feedback';
import './components/utils/tm-loading';
import './components/user/tm-user-register';
import { FeedbackMixin } from './mixins/feedback-mixin';
import { icons } from './icons/icons';
import '@dile/ui/components/icon/icon';
import { Routes, Router } from '@lit-labs/router';
import './components/tm-time-counter';
import './components/utils/tm-ajax';
import './components/utils/tm-ajax-form';
import './components/interface/tm-icon';

import './components/pages/tm-page-home';

import './components/pages/tm-page-404';
// import './components/countries/tm-countries';
// import './components/countries/tm-country-detail';

import './components/interface/tm-navigation';

export class TmApp extends FeedbackMixin(LitElement) {
  static styles = [
    css`
      * {
        box-sizing: border-box;
      }
      :host {
        display: block;
      }
      dile-nav span {
        font-weight: bold;
        font-size: 1.125;
      }
      .menu-content {
        padding: 1.5rem;
        min-width: 220px;
      }
      .menu-content h2 {
        color: var(--foreground-color);
        margin: 2rem 0 0.5rem 0;
      }
      main {
        padding: 1rem;
      }
      .nav-heading {
        display: flex;
        align-items: center;
      }

      .nav-heading dile-icon {
        margin-right: 0.4rem;
        --dile-icon-color: #3f9;
        --dile-icon-size: 32px;
      }

      @media(min-width: 500px) {
        main {
          padding: 1.6rem;
        }   
        .menu-content h2 {
          color: var(--foreground-color);
          margin: 2rem 0 1rem;
        }
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
    this.addEventListener('tm-navigate', (e) => {
      this._routes.goto(e.detail.url);
      history.pushState(null, 'App Timer', e.detail.url);
    });
  }

  render() {
    return html`
      <dile-nav>
        <span slot="title" class="nav-heading">
        <dile-icon .icon="${icons.token}"></dile-icon>
          Hi from EscuelaIT!!
        </span>
        <dile-menu-hamburger slot="menu" direction="left" hamburgerAlwaysVisible>
          <div class="menu-content" slot="menu">
            <h2>Menu</h2>
            <tm-navigation @tm-nav-navigation=${this.closeDrawer}></tm-navigation>
          </div>
        </dile-menu-hamburger>
      </dile-nav>
      <main>
        ${this._routes.outlet()}
      </main>
      <tm-feedback></tm-feedback>
      <tm-loading></tm-loading>
    `;
  }

  createRoutes() {
    new Router(this, []);
    this._routes = new Routes(this, [
      {path: '/', render: () => {
          console.log('vista home');
          return html`<tm-page-home></tm-page-home>`
        }
      },
      {
        path: '/contacto', 
        render: () => html`<tm-page-contact></tm-page-contact>`,
        enter: async () => {
          await import('./components/pages/tm-page-contact');
        },
      },
      {
        path: '/countries*', 
        render: () => html`<tm-countries></tm-countries>`,
        enter: async () => {
          await import('./components/countries/tm-countries');
        },
      },
      {
        path: '/*',
        render: () => html`<tm-page-404></tm-page-404>`,
      }
    ]);
  }

  closeDrawer() {
    this.shadowRoot.querySelector('dile-menu-hamburger').close();
  }
  
}
customElements.define('tm-app', TmApp);
