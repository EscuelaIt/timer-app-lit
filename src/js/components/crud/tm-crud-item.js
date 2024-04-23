import { LitElement, html, css } from 'lit';
import { editIcon, deleteIcon } from '@dile/icons';
import '@dile/ui/components/icon/icon';

export class TmCrudItem extends LitElement {
  static styles = [
    css`
    :host {
      display: block;
      --dile-icon-size: 22px;
      --dile-icon-color: var(--secondary-light-color);
      --dile-icon-rounded-background-color: var(--primary-color);
      --dile-icon-rounded-padding: 0.25rem;
    }
    section, section .content, .content span {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    section, section .content {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    section {
      margin-bottom: 0.4rem;
      padding-bottom: 0.4rem;
      border-bottom: 1px solid #ddd;
    }
    section .content {
      flex-grow: 1;
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
      itemDistribution: { type: Array },
    };
  }

  render() {
    return html`
      <section>
        <div class="content">
          ${this.itemCustomTemplate}
        </div>
        <dile-icon .icon="${editIcon}" rounded @click=${this.emmitEditAction}></dile-icon>
        <dile-icon class="danger" .icon="${deleteIcon}" rounded @click=${this.emmitDeleteAction}></dile-icon>
      </section>
    `;
  }

  get itemCustomTemplate() {
    return html`
      ${this.itemDistribution.map( section => html`
        <span style="${section.css}">
          ${section.href
            ? html`<a href="${section.href(this.item)}">${this.itemContent(section, this.item)}</a>`
            : this.itemContent(section, this.item)
          }
        </span>
      `)}
    `;
  }

  itemContent(section, item) {
    return html`${item[section.name]}`;
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
customElements.define('tm-crud-item', TmCrudItem);
