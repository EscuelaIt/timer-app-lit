import { LitElement, html, css } from 'lit';
import '@dile/ui/components/modal/modal';

export class TmCrudInsert extends LitElement {
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
    this.formIdentifier = "form"
  }

  firstUpdated() {
    this.elmodal = this.shadowRoot.getElementById('elmodal');
    this.elform = this.shadowRoot.getElementById(this.formIdentifier);
  }



  render() {
    return html`
      <dile-modal
        id="elmodal"
        showCloseIcon
        blocking
        
      >
        <tm-ajax-form
          endpoint="${this.endpoint}"
          operation="insert"
          actionLabel="Crear"
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

  open() {
    this.elmodal.open();
  }

  saveSuccess() {
    this.elmodal.close();
    this.elform.clearData();
  }

}
customElements.define('tm-crud-insert', TmCrudInsert);
