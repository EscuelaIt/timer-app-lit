import { html, css } from 'lit';
import { TmCrud } from '../crud/tm-crud';
import './tm-projects-insert';
import './tm-projects-edit';
import './tm-project-form';

export class TmProjects extends TmCrud {
  
  constructor() {
    super();
    this.endpoint = "/api/projects";
    this.title = "Proyectos";
    this.itemDistribution = [
      {
        name: "id", 
        css: "width: 30px; min-width: 30px;",
      },
      {
        name: "name",
        css: "flex-grow: 1; font-weight: bold;",
      }
    ];
  }

  get insertTemplate() {
    return html`
      <tm-projects-insert
        id="elinsert"
        endpoint="${this.endpoint}"
      ></tm-projects-insert>
    `
  }

  get editTemplate() {
    return html`
      <tm-projects-edit
        id="eledit"
        endpoint="${this.endpoint}"
      ></tm-projects-edit>
    `
  }
}
customElements.define('tm-projects', TmProjects);
