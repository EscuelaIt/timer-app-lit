import { LitElement, html, css } from 'lit';

export class TmCategoriesEdit extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      tm-ajax-form {
        margin: 1rem 0.5rem;
      }
    `
  ];

  static get properties() {
    return {
      endpoint: { type: String }
    };
  }

  firstUpdated() {
    this.elmodal = this.shadowRoot.getElementById('elmodal');
    this.editform = this.shadowRoot.getElementById('editform');
  }

  render() {
    return html`
      <dile-modal
        id="elmodal"
        showCloseIcon
        blocking
      >
        <tm-ajax-form
          id="editform"
          endpoint="${this.endpoint}"
          operation="update"
          actionLabel="Editar"
          @save-success=${this.saveSuccess}
          loadOnInit
        >
          <tm-category-form id="form"></tm-category-form>
        </tm-ajax-form>
    </dile-modal>
    `;
  }

  open(itemId) {
    console.log('voy a cargar el ', itemId);
    this.editform.relatedId = itemId;
    this.elmodal.open();
  }

  saveSuccess() {
    this.elmodal.close();
  }
}
customElements.define('tm-categories-edit', TmCategoriesEdit);
