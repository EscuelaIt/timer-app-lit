import { LitElement, html, css } from 'lit';
import '@dile/ui/components/confirm/confirm';

export class TmCategoriesDelete extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        --dile-confirm-cancel-button-color: transparent;
        --dile-confirm-cancel-text-button-color: #303030;
        --dile-confirm-accept-button-color: #c55;
      }
    `
  ];

  static get properties() {
    return {
      itemId: { type: String },
      endpoint: { type: String },
    };
  }

  firstUpdated() {
    this.elconfirm = this.shadowRoot.getElementById('elconfirm');
    this.ajaxdelete = this.shadowRoot.getElementById('ajaxdelete');
  }

  render() {
    return html`
      <tm-ajax
        id="ajaxdelete"
        url="${this.endpoint}/${this.itemId}"
        method="delete"
        @ajax-success=${this.deleteSuccess}
      ></tm-ajax>
      <dile-confirm 
        id="elconfirm"
        cancelLabel="Cancelar"
        acceptLabel="Borrar"
        @dile-confirm-accepted="${this.doDelete}"
      >
        <p>
          ¿De verdad deseas borrar este elemento?
        </p>
      </dile-confirm>

    `;
  }

  open(itemId) {
    console.log('voy a borrar', itemId);
    this.elconfirm.open();
    this.itemId = itemId;
  }

  doDelete() {
    this.ajaxdelete.generateRequest();
  }

  deleteSuccess() {
    console.log('akkkkkiiii');
    this.dispatchEvent(new CustomEvent('delete-success', {
      bubbles: true,
      composed: true,
    }));
  }
}
customElements.define('tm-categories-delete', TmCategoriesDelete);
