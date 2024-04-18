import { LitElement, html, css } from 'lit';
import { TmCrudInsert } from '../crud/tm-crud-insert';

export class TmProjectsInsert extends TmCrudInsert {
  get formTemplate() {
    return html`<tm-project-form id="form"></tm-project-form>`
  }
}
customElements.define('tm-projects-insert', TmProjectsInsert);
