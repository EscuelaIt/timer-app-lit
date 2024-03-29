import { LitElement, html, css } from 'lit';
import '@dile/ui/components/nav/nav';
import '@dile/ui/components/menu-hamburger/menu-hamburger';
import './components/utils/tm-feedback';
import './components/user/tm-user-register';
import { FeedbackMixin } from './mixins/feedback-mixin';
import './components/tm-countries';

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
        <span slot="title">Hi from Polydile!!</span>
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
    `;
  }

  success() {
    this.positiveFeedback('todoo muy bien');
  }
  
}
customElements.define('tm-app', TmApp);
