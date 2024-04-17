import { LitElement, html, css } from 'lit';
import { editIcon, deleteIcon } from '@dile/icons';
import '@dile/ui/components/icon/icon';

export class TmCategoryItem extends LitElement {
  static styles = [
    css`
    :host {
      display: block;
      --dile-icon-size: 22px;
      --dile-icon-color: var(--secondary-light-color);
      --dile-icon-rounded-background-color: var(--primary-color);
      --dile-icon-rounded-padding: 0.25rem;
    }
    section {
      display: flex;
      align-items: center;
      margin-bottom: 0.4rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #ddd;
      gap: 0.5rem;
    }
    section span {
      flex-grow: 1;
      font-weight: bold;
    }
    dile-icon:hover {
      --dile-icon-color: var(--primary-color);
      --dile-icon-rounded-background-color: var(--secondary-light-color);
    }
    .danger {
      --dile-icon-color: #fff;
      --dile-icon-rounded-background-color: #c55;
    }
    dile-icon.danger:hover {
      --dile-icon-color: #c55;
      --dile-icon-rounded-background-color: var(--secondary-light-color);
    }
    `
  ];

  static get properties() {
    return {
      item: { type: Object },
    };
  }

  render() {
    return html`
      <section>
        <span>${this.item.name}</span>
        <dile-icon .icon="${editIcon}" rounded @click=${this.emmitEditAction}></dile-icon>
        <dile-icon class="danger" .icon="${deleteIcon}" rounded @click=${this.emmitDeleteAction}></dile-icon>
      </section>
    `;
  }

  emmitEditAction() {
    this.dispatchEvent(new CustomEvent('edit-request', { 
      bubbles: true,
      composed: true,
      detail: { itemId: this.item.id }
    }));
  }

  emmitDeleteAction() {
    this.dispatchEvent(new CustomEvent('delete-request', { 
      bubbles: true,
      composed: true,
      detail: { itemId: this.item.id }
    }));
  }
  
}
customElements.define('tm-category-item', TmCategoryItem);
