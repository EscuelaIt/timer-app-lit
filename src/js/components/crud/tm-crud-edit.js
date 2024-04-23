import { LitElement, html, css } from 'lit';
import '@dile/ui/components/modal/modal';

export class TmCrudEdit extends LitElement {
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
      endpoint: { type: String },
      formIdentifier: { type: String },
    };
  }

  constructor() {
    super();
    this.formIdentifier = "form";
  }

  firstUpdated() {
    this.elmodal = this.shadowRoot.getElementById('elmodal');
    this.editform = this.shadowRoot.getElementById('editform');
    this.elform = this.shadowRoot.getElementById(this.formIdentifier);
  }

  render() {
    return html`
      <dile-modal
        id="elmodal"
        showCloseIcon
        blocking
        @dile-modal-closed=${this.clearForm}
      >
        <tm-ajax-form
          id="editform"
          endpoint="${this.endpoint}"
          operation="update"
          actionLabel="Editar"
          @save-success=${this.saveSuccess}
          formIdentifier="${this.formIdentifier}"
        >
          ${this.formTemplate}
        </tm-ajax-form>
    </dile-modal>
    `;
  }

  get formTemplate() {
    // Sobreescribir este método para colocar el formulario
  }

  open(itemId) {
    console.log('voy a cargar el ', itemId);
    this.editform.relatedId = itemId;
    this.editform.loadData();
    this.elmodal.open();
  }

  saveSuccess() {
    this.elmodal.close();
  }

  clearForm() {
    this.elform.clearData();
  }
}
customElements.define('tm-crud-edit', TmCrudEdit);
