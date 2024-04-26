import { LitElement, html, css } from 'lit';
import '@dile/ui/components/nav/nav';
import '@dile/ui/components/button/button';
import '@dile/ui/components/menu-hamburger/menu-hamburger';
import './utils/tm-feedback';
import './utils/tm-loading';
import './user/tm-user-register';
import { FeedbackMixin } from '../mixins/feedback-mixin';
import { icons } from '../icons/icons';
import '@dile/ui/components/icon/icon';
import { Routes, Router } from '@lit-labs/router';
import './tm-time-counter';
import './utils/tm-ajax';
import './utils/tm-ajax-form';
import './interface/tm-icon';
import './interface/tm-navigation';
import './user/tm-user'
import './pages/tm-page-home';
import './pages/tm-page-contact';
import './pages/tm-page-404';
import { ifDefined } from 'lit/directives/if-defined.js';
import './intervals/tm-opened-interval';


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
      console.log('ruta...', e.detail.url);
      history.pushState(null, 'App Timer', e.detail.url);
      setTimeout( () => this._routes.goto(e.detail.url), 100);
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
        <tm-user slot="actions"></tm-user>
      </dile-nav>
      <main>
        <tm-opened-interval></tm-opened-interval>
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
      {path: '/contacto', render: () => html`<tm-page-contact></tm-page-contact>`},
      {
        path: '/countries*', 
        render: () => html`<tm-countries></tm-countries>`,
        enter: async () => {
          await import('./countries/tm-countries');
        },
      },
      {
        path: '/login', 
        render: () => html`<tm-user-login @new-token-issued=${this.saveToken}></tm-user-login>`,
        enter: async () => {
          await import('./user/tm-user-login');
        },
      },
      {
        path: '/registro', 
        render: () => html`<tm-user-register @new-token-issued=${this.saveToken}></tm-user-register>`,
        enter: async () => {
          await import('./user/tm-user-register');
        },
      },
      {
        path: '/categorias', 
        render: () => html`<tm-categories></tm-categories>`,
        enter: async () => {
          await import('./categories/tm-categories');
        },
      },
      {
        path: '/clientes', 
        render: () => html`<tm-customers></tm-customers>`,
        enter: async () => {
          await import('./customers/tm-customers');
        },
      },
      {
        path: '/proyectos', 
        render: () => html`<tm-projects></tm-projects>`,
        enter: async () => {
          await import('./projects/tm-projects');
        },
      },
      {
        path: '/proyectos/:id', 
        render: ({id}) => html`<tm-project-detail @interval-opened=${this.intervalOpened} projectId="${ifDefined(id)}"></tm-project-detail>`,
        enter: async () => {
          await import('./projects/tm-project-detail');
        },
      },
      {
        path: '/*',
        render: () => html`<tm-page-404></tm-page-404>`,
      }

    ]);
  }

  saveToken(e) {
    this.shadowRoot.querySelector('tm-user').checkToken(e.detail.token)
  }

  closeDrawer() {
    this.shadowRoot.querySelector('dile-menu-hamburger').close();
  }
  
  intervalOpened() {
    this.shadowRoot.querySelector('tm-opened-interval').refresh();
  } 
}
customElements.define('tm-app', TmApp);
