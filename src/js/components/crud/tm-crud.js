import { LitElement, html, css } from 'lit';
import './tm-crud-list';
import './tm-crud-delete';

export class TmCrud extends LitElement {
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
      itemDistribution: { type: Array },
    };
  }

  constructor() {
    super();
  }

  firstUpdated() {
    this.elinsert = this.shadowRoot.getElementById('elinsert');
    this.ellist = this.shadowRoot.getElementById('ellist');
    this.eledit = this.shadowRoot.getElementById('eledit');
    this.eldelete = this.shadowRoot.getElementById('eldelete');
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <p>
        <dile-button @click=${this.openCreate}>Crear</dile-button>
      </p>
      <section @save-success=${this.doListRefresh}>
        ${this.insertTemplate}
        ${this.editTemplate}
      </section>

      <tm-crud-list
        id="ellist"
        endpoint="${this.endpoint}"
        @edit-request=${this.openEdit}
        @delete-request=${this.openDelete}
        .itemDistribution=${this.itemDistribution}
      ></tm-crud-list>
      
      <tm-crud-delete
        id="eldelete"
        endpoint="${this.endpoint}"
        @delete-success=${this.deleteSuccess}
      ></tm-crud-delete>
    `;
  }

  get insertTemplate() {
    // Sobreescribir este método para poner funcionalidad de inserción
  }

  get editTemplate() {
    // Sobreescribir este método para poner funcionalidad de edición
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

  doListRefresh() {
    this.ellist.refresh();
  }

  deleteSuccess() {
    this.ellist.refresh();
  }
}
customElements.define('tm-crud', TmCrud);
