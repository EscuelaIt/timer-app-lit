import { LitElement, html, css } from 'lit';
import '@dile/ui/components/menu-overlay/menu-overlay';
import '@dile/ui/components/checkbox/checkbox';
import '@dile/ui/components/icon/icon';
import { addIcon } from '@dile/icons';
import { StateMixin } from '../../mixins/state-mixin';

export class CategoriesMenu extends StateMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      li {
        margin: 0.25rem 0;
      }
      .content {
        margin: 0.75rem;
      }
    `
  ];

  static get properties() {
    return {
      categories: { type: Array },
      intervalId: { type: String },
      item: { type: Object },
    };
  }

  constructor() {
    super();
    this.categories = [];
  }

  firstUpdated() {
    let state = this.getState();
    this.stateChanged(state);
  }

  stateChanged(state) {
    console.log('categoiess state', state);
    if(state?.categories) {
      this.categories = state.categories;
    }
  }

  render() {
    return html`
      <dile-menu-overlay>
        <span slot="trigger"><dile-icon .icon="${addIcon}" rounded></dile-icon></span>
        <div class="content" slot="content">
          <p>Categorías:</p>
          <ul>
            ${this.categories.map( category => html`
              <li>
                <dile-checkbox 
                  ?checked=${this.isInItemCategories(category.id)} 
                  @dile-checkbox-changed=${this.checkboxChangedHandlerCreator(category.id)}
                >${category.name}</dile-checkbox></li>`)}
          </ul>
        </div>
      </dile-menu-overlay>
    `;
  }

  isInItemCategories(categoryId) {
    let cat = this.item.categories.find( (item) => item.id == categoryId)
    return cat ? true : false;
  }

  checkboxChangedHandlerCreator(id) {
    return (e) => {
      this.dispatchEvent(new CustomEvent('category-changed', { 
        bubbles: true,
        composed: true,
        detail: {
          categoryId: id,
          checked: e.detail.checked,
          intervalId: this.intervalId
        }
      }));
    }
  }
}
customElements.define('categories-menu', CategoriesMenu);
