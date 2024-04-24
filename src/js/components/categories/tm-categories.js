import { LitElement, html, css } from 'lit';
import '@dile/ui/components/button/button';
import './tm-categories-insert';
import './tm-categories-edit';
import './tm-categories-delete';
import './tm-category-form';
import './tm-categories-list';
import '../user/tm-user-validator';

export class TmCategories extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      endpoint: { type: String },
      title: { type: String },
    };
  }

  constructor() {
    super();
    this.title = "Categorías"
    this.endpoint = '/api/categories';
  }

  firstUpdated() {
    this.elinsert = this.shadowRoot.getElementById('elinsert');
    this.ellist = this.shadowRoot.getElementById('ellist');
    this.eledit = this.shadowRoot.getElementById('eledit');
    this.eldelete = this.shadowRoot.getElementById('eldelete');
  }

  render() {
    return html`
      <tm-user-validator>
        <h1>${this.title}</h1>
        <p>
          <dile-button @click=${this.openCreate}>Crear</dile-button>
        </p>
        <tm-categories-insert 
          id="elinsert"
          endpoint="${this.endpoint}"
          @save-success=${this.insertSuccess}
        ></tm-categories-insert>
        <tm-categories-list
          id="ellist"
          endpoint="${this.endpoint}"
          @edit-request=${this.openEdit}
          @delete-request=${this.openDelete}
        ></tm-categories-list>
        <tm-categories-edit
          id="eledit"
          endpoint="${this.endpoint}"
          @save-success=${this.editSuccess}
        ></tm-categories-edit>
        <tm-categories-delete
          id="eldelete"
          endpoint="${this.endpoint}"
          @delete-success=${this.deleteSuccess}
        ></tm-categories-delete>
      </tm-user-validator>
    `;
  }

  openCreate() {
    this.elinsert.open();
  }

  openEdit(e) {
    this.eledit.open(e.detail.itemId);
  }

  openDelete(e) {
    this.eldelete.open(e.detail.itemId);
  }

  insertSuccess() {
    this.ellist.refresh();
  }

  editSuccess() {
    this.ellist.refresh();
  }

  deleteSuccess() {
    this.ellist.refresh();
  }
}
customElements.define('tm-categories', TmCategories);
