import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';

export class TmCountriesCreate extends FeedbackMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
      label {
        display: block;
      }
      .errormessage {
        font-size: 0.9rem;
        color: red;
      }
    `
  ];

  firstUpdated() {
    this.ajaxpost = this.shadowRoot.getElementById('ajaxpost');
  }

  render() {
    return html`
      <p>
        <label for="name">Nombre:</label>
        <input name="name" id="name">
        <span id="error_name" class="errormessage"></span>
      </p>
      <p>
        <label for="slug">Slug:</label>
        <input name="slug" id="slug">
        <span id="error_slug" class="errormessage"></span>
      </p>
      <p>
        <label for="continent">Continente:</label>
        <select name="continent" id="continent">
          <option value="">Selecciona...</option>
          <option value="Europe">Europa</option>
          <option value="Asia">Asia</option>
        </select>
        <span id="error_continent" class="errormessage"></span>
      </p>
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
    this.clearErrors();

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
      this.shadowRoot.getElementById('error_' + name).innerText = errors[name][0];
    } 
  }

  clearErrors() {
    this.shadowRoot.querySelectorAll('.errormessage').forEach(item => item.innerText = '');
  }

}
customElements.define('tm-countries-create', TmCountriesCreate);
