import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';

export class TmAjaxForm extends FeedbackMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      operation: { type: String },
      endpoint: { type: String },
      actionLabel: { type: String },
      formIdentifier: { type: String, },
      relatedId: { type: String },
      loadOnInit: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.formIdentifier = 'form';
  }

  firstUpdated() {
    this.ajaxsave = this.shadowRoot.getElementById('ajaxsave');
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
  }

  updated(changedProperties) {
    if (changedProperties.has('relatedId') || changedProperties.has('endpoint')) {
        if(this.loadOnInit) {
            // console.log('paso por updated', changedProperties.has('relatedId'), changedProperties.has('endpoint'), changedProperties.get('endpoint'));
            this.loadData();
        }
    }
}

  get form() {
    return this.querySelector('#' + this.formIdentifier);
  }

  render() {
    return html`
      ${this.ajaxComponents}
      <slot></slot>
      <div class="actions">
          <dile-button @click=${this.doAction}>${this.actionLabel}</dile-button>
      </div> 
    `;
  }

  get ajaxComponents() {
    return html`
      <tm-ajax
        id="ajaxget"
        method="get"
        url="${this.endpoint}/${this.relatedId}"
        @ajax-success="${this.doSuccessGet}"
        @ajax-error="${this.doErrorGet}"
      ></tm-ajax>
      <tm-ajax
        id="ajaxsave"
        method="${this.saveMethod(this.operation)}"
        url="${this.endpoint}${this.operation == 'insert' ? '' : `/${this.relatedId}`}"
        @ajax-success="${this.doSuccessSave}"
        @ajax-error="${this.doErrorSave}"
      ></tm-ajax>
    `
  }

  saveMethod(operation) {
    switch(operation) {
        case 'insert':
            return 'post';
        case 'update':
            return 'put';
    }
    throw `tm-ajax-form operation "${operation}" not supported (operaciones permitidas: 'insert', 'update')`;
  }

  doAction() {
    this.ajaxsave.data = this.form.getData();
    this.ajaxsave.generateRequest();
  }

  doErrorSave(e) {
    this.negativeFeedback(e.detail.message);
    this.form.showErrors(e.detail.errors);
    this.dispatchEvent(new CustomEvent('save-error', { 
        bubbles: true,
        composed: true,
        detail: e.detail
    }));
  }

  doSuccessSave(e) {
      let data = e.detail;
      let msg = data.message;
      if(! msg) {
          data.message = 'Operación realizada con éxito';
      }
      this.positiveFeedback(msg);
      this.dispatchEvent(new CustomEvent('save-success', { 
          bubbles: true,
          composed: true,
          detail: data
      }));
  }

  loadData() {
    // console.log('loadData - relatedId: ', this.relatedId, ' - endpoint: ', this.endpoint, 'url: ', this.ajaxget.url);
    this.updateComplete.then( () => this.ajaxget.generateRequest() );
}

  doErrorGet(e) {
    this.negativeFeedback(e.detail.message);
    this.dispatchEvent(new CustomEvent('tm-ajax-form-get-error', { 
        bubbles: true,
        composed: true,
        detail: {
            msg: e.detail,
        }
    }));
  }

  doSuccessGet(e) {
      console.log('dato cargado en ajax form', e.detail);
      this.form.setData(e.detail.data);
      this.dispatchEvent(new CustomEvent('tm-ajax-form-loaded', {
          bubbles: true,
          composed: true,
          detail: e.detail
      }));
  }
}
customElements.define('tm-ajax-form', TmAjaxForm);
