import { LitElement, html, css } from 'lit';
import '@dile/ui/components/avatar/avatar';
import '@dile/ui/components/menu-overlay/menu-overlay';
import { userMenuButtonStyles } from './user-menu-button-styles';
import { TokenMixin } from '../../mixins/token-mixin';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import { StateMixin } from '../../mixins/state-mixin';

export class TmUser extends StateMixin(FeedbackMixin(TokenMixin(LitElement))) {
  static styles = [
    userMenuButtonStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        --dile-avatar-background-color: var(--secondary-color);
      }
      dile-menu-overlay {
        display: flex;
        align-items: center;
      }
      dile-avatar {
        cursor: pointer;
      }
      .name {
        margin: 1rem;
      }
    `
  ];

  static get properties() {
    return {
      user: { type: Object },
    };
  }

  firstUpdated() {
    this.getUserAjax = this.shadowRoot.getElementById('getUserAjax');
    if(this.token) {
      this.checkToken(this.token);
    } else {
      this.saveUserLoggedOut();
    }
  }

  render() {
    return html`
    <tm-ajax
      id="getUserAjax"
      url="/api/auth/user"
      method="get"
      @ajax-success="${this.saveUserData}"
      @ajax-error="${this.saveUserLoggedOut}"
    ></tm-ajax>
    ${this.user
      ? this.authenticatedTemplate
      : this.unauthenticatedTemplate
    }
    `;
  }

  get unauthenticatedTemplate() {
    return html`
      <dile-menu-overlay>
        <span slot="trigger"><dile-avatar darkIcon></dile-avatar></span>
        <div slot="content">
          <a class="loginoption" href="/login">Login</a>
          <a class="loginoption" href="/registro">Registro</a>
        </div>
      </dile-menu-overlay>
    `
  }

  get authenticatedTemplate() {
    return html`
      <dile-menu-overlay>
        <span slot="trigger"><dile-avatar initial="${this.user.name}" darkIcon></dile-avatar></span>
        <div slot="content">
          <p class="name">${this.user.name}</p>
          <a class="loginoption" href="#" @click=${this.logout}>Logout</a>
        </div>
      </dile-menu-overlay>
    `
  }

  checkToken(token) {
    this.storeToken(token);
    this.getUserAjax.generateRequest();
  }

  saveUserData(e) {
    this.setState({
      loggedIn: true
    });
    this.user = e.detail.data
  }
  
  logout(e) {
    e.preventDefault();
    this.removeToken();
    this.saveUserLoggedOut();
    this.user = null;
    this.positiveFeedback('Logout realizado');
  }

  saveUserLoggedOut() {
    console.log('saveUserLoggedOut');
    this.setState({
      loggedIn: false
    });
  }
}
customElements.define('tm-user', TmUser);
