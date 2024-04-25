import { LitElement, html, css } from 'lit';
import { NavigationMixin } from '../../mixins/navigation-mixin';

export class TmNavigation extends NavigationMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      p {
        margin: 0 0 0.5rem;

      }
      a {
        text-decoration: none;
      }
    `
  ];

  static get properties() {
    return {
      links: { type: Array }
    };
  }

  constructor() {
    super();
    this.links = [
      { href: "/", text: 'Home' },
      { href: "/countries", text: 'Países' },
      { href: "/categorias", text: 'Categorías' },
      { href: "/clientes", text: 'Clientes' },
      { href: "/proyectos", text: 'Proyectos' },
      { href: "/contacto", text: 'Contacto' },
    ]
  }

  render() {
    return html`
      ${this.links.map(link => html`
        <p><a href="${link.href}" @click=${this.navGoTo}>${link.text}</a></p>
      `)}
    `;
  }

  navGoTo(e) {
    e.preventDefault();
    this.goToUrl(e.target.getAttribute('href'));
    this.dispatchEvent(new CustomEvent('tm-nav-navigation'));
  }
}
customElements.define('tm-navigation', TmNavigation);
