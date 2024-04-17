import { LitElement, html, css } from 'lit';
import '@dile/ui/components/modal/modal'

export class TmCategoriesInsert extends LitElement {
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
    this.elmodal = this.shadowRoot.getElementById('elmodal')
    this.elform = this.shadowRoot.getElementById('form')
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
        >
          <tm-category-form id="form"></tm-category-form>
        </tm-ajax-form>
      </dile-modal>
    `;
  }

  open() {
    this.elmodal.open();
  }

  saveSuccess() {
    this.elmodal.close();
    this.elform.clearData();
  }
}
customElements.define('tm-categories-insert', TmCategoriesInsert);
