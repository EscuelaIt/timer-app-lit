import { LitElement, html, css } from 'lit';
import '@dile/ui/components/nav/nav';
import '@dile/ui/components/button/button';
import '@dile/ui/components/menu-hamburger/menu-hamburger';
import './components/utils/tm-feedback';
import './components/utils/tm-loading';
import './components/user/tm-user-register';
import { FeedbackMixin } from './mixins/feedback-mixin';
import './components/countries/tm-countries';
import { icons } from './icons/icons';
import '@dile/ui/components/icon/icon';

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
        margin: 1.5rem 0;
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
          margin: 2rem 0;
        }
      }
    `
  ];

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
            <p><a href="#">Link 1</a></p>
            <p><a href="#">Another link</a></p>
            <p><a href="#">More information</a></p>
            <p><a href="#">Contact us</a></p>
          </div>
        </dile-menu-hamburger>
      </dile-nav>
      <main>
        <p>
          lorem ipsum... 
        </p>
        <button @click=${this.success}>mostrar todo bien</button>
        <tm-user-register></tm-user-register>

        <tm-countries></tm-countries>
      </main>


      <tm-feedback></tm-feedback>
      <tm-loading></tm-loading>

    `;
  }

  success() {
    this.positiveFeedback('todoo muy bien');
  }

  
  
}
customElements.define('tm-app', TmApp);
