import { LitElement, html, css } from 'lit';
import { StateMixin } from '../../mixins/state-mixin';
import { NavigationMixin } from '../../mixins/navigation-mixin';
import '@dile/ui/components/spinner/spinner';

export class TmUserValidator extends NavigationMixin(StateMixin(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      loaded: { type: Boolean }
    };
  }

  render() {
    return html`
      ${this.loaded
        ? html`<slot></slot>`
        : html`<dile-spinner active></dile-spinner>`
      }
      
    `;
  }

  firstUpdated() {
    const currentState = this.getState();
    this.stateChanged(currentState);
  }

  stateChanged(state) {
    if(state && state.loggedIn === false) {
      this.goToUrl('/login');
    }
    if(state && state.loggedIn === true) {
      this.loaded = true;
    } 
  }
}
customElements.define('tm-user-validator', TmUserValidator);
