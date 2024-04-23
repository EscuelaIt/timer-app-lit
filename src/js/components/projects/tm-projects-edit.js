import { LitElement, html, css } from 'lit';
import { TmCrudEdit } from '../crud/tm-crud-edit';
import './tm-project-form';


export class TmProjectsEdit extends TmCrudEdit {
  get formTemplate() {
    return html`<tm-project-form id="form"></tm-project-form>`
  }
}
customElements.define('tm-projects-edit', TmProjectsEdit);
