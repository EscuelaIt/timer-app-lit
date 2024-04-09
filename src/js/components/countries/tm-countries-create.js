import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import '@dile/ui/components/input/input.js';
import '@dile/ui/components/select/select.js';

export class TmCountriesCreate extends FeedbackMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  firstUpdated() {
    this.ajaxpost = this.shadowRoot.getElementById('ajaxpost');
  }

  render() {
    return html`
      <dile-input label="Nombre" name="name" id="name" hideErrorOnInput></dile-input>
      <dile-input label="Slug" name="slug" id="slug" hideErrorOnInput></dile-input>
      <dile-select name="continent" id="continent" label="Continente" hideErrorOnInput>
        <select slot="select">
          <option value="">Selecciona...</option>
          <option value="Europe">Europa</option>
          <option value="Asia">Asia</option>
        </select>
      </dile-select>
      <dile-button @click=${this.create}>Crear</dile-button>
      <tm-ajax
        id="ajaxpost"
        method="post"
        url="https://timer.escuelait.com/api/countries"
        @ajax-error=${this.ajaxpostError}
        @ajax-success=${this.ajaxpostSuccess}
      ></tm-ajax>

    `;
  }

  accessElementValue(element) {
    return this.shadowRoot.getElementById(element).value;
  }

  create() {
    this.startLoading();
    const data = {
      name: this.accessElementValue('name'),
      slug: this.accessElementValue('slug'),
      continent: this.accessElementValue('continent')
    }
    console.log(data);
    this.ajaxpost.data = data;
    this.ajaxpost.generateRequest();

    //this.updateComplete.then( () => this.ajaxpost.generateRequest() ) 
  }

  ajaxpostError(e) {
    this.stopLoading();
    console.log('respuesta ajax', e.detail);
    this.negativeFeedback(e.detail.message);
    this.showErrors(e.detail.errors);
  }

  ajaxpostSuccess(e) {
    this.stopLoading();
    console.log('ajaxpostSuccess', e.detail);
  }

  showErrors(errors) {
    for(let name in errors) {
      let elem = this.shadowRoot.getElementById(name);
      elem.message = errors[name][0];
      elem.errored = true;
    } 
  }


}
customElements.define('tm-countries-create', TmCountriesCreate);
