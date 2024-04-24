import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import '@dile/ui/components/card/card';
import './tm-projects-edit';
import '@dile/ui/components/button/button';
import '../user/tm-user-validator';

export class TmProjectDetail extends FeedbackMixin(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ];

  static get properties() {
    return {
      projectId: { type: String },
      project: { type: Object },
      endpoint: { type: String },
    };
  }

  constructor() {
    super();
    this.endpoint = '/api/projects';
  }

  firstUpdated() {
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
    this.refresh();
  }

  render() {
    return html`
      <tm-user-validator>
        <tm-ajax
          id="ajaxget"
          method="get"
          url="${this.endpoint}/${this.projectId}"
          @ajax-success="${this.doSuccessGet}"
          @ajax-error="${this.doErrorGet}"
        ></tm-ajax>
        ${this.project
          ? this.projectDetailTemplate
          : html`<p>Cargando...</p>`
        }
        <tm-projects-edit
          id="eledit"
          endpoint="${this.endpoint}"
          @save-success="${this.saveSuccess}"
        ></tm-projects-edit>
      </tm-user-validator>
    `;
  }

  get projectDetailTemplate() {
    return html`
      <dile-card title="${this.project.name}">
        <p>
          ${this.project.description ? this.project.description : 'Sin descripción'}
        </p>
        <div slot="footer">
          <dile-button @click="${this.openEdit}">Editar</dile-button>
        </div>
      </dile-card>
    `
  }

  doSuccessGet(e) {
    this.project = e.detail.data
  }

  doErrorGet(e) {
    this.negativeFeedback(e.detail.message)
  }

  openEdit() {
    this.shadowRoot.getElementById('eledit').open(this.projectId);
  }

  refresh() {
    this.ajaxget.generateRequest();
  }

  saveSuccess(e) {
    console.log(e.detail);
    this.project = e.detail.data;
  }
}
customElements.define('tm-project-detail', TmProjectDetail);
