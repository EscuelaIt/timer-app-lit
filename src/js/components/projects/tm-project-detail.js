import { LitElement, html, css } from 'lit';
import { FeedbackMixin } from '../../mixins/feedback-mixin';
import '@dile/ui/components/card/card';
import './tm-projects-edit';
import '@dile/ui/components/button/button';
import '../user/tm-user-validator';
import '../intervals/tm-open-interval';
import '../crud/tm-crud-list-item-template';
import '../intervals/tm-interval-item';
import { StateMixin } from '../../mixins/state-mixin';
import '../categories/categories-menu';

export class TmProjectDetail extends StateMixin(FeedbackMixin(LitElement)) {
  static styles = [
    css`
      :host {
        display: block;
      }
      dile-card {
        margin-bottom: 1rem;
      }
    `
  ];

  static get properties() {
    return {
      projectId: { type: String },
      project: { type: Object },
      endpoint: { type: String },
      itemDistribution: { type: Object },
      filters: { type: Object },
    };
  }

  constructor() {
    super();
    this.endpoint = '/api/projects';
    this.itemDistribution = [
      {
        name: 'id',
        css: 'width: 100px; min-width: 100px; text-align: center;',
      },
      {
        name: 'start_time'
      }
      ,
      {
        name: 'seconds_opened'
      }
    ];
    this.filters = {};
  }

  firstUpdated() {
    this.ajaxget = this.shadowRoot.getElementById('ajaxget');
    this.refresh();
  }

  updated(changedProperties) {
    if(changedProperties.has('projectId')) {
      if(this.projectId) {
        console.log('actualizar el objeto del filtro');
        this.filters = {
          project_id: this.projectId
        };
      }
    }
  }

  get ellist() {
    return this.shadowRoot.getElementById('ellist');
  }

  stateChanged(state) {
    if(this.ellist && this.openedInterval !== state.openedInterval) {
      this.ellist.refresh();
    }
    this.openedInterval = state.openedInterval
  }

  render() {
    return html`
      <tm-user-validator>
        <tm-ajax
          id="categoryIntervalAjax"
          method="post"
        ></tm-ajax>
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
          <tm-open-interval
            projectId="${this.projectId}"
            @interval-opened=${this.refreshIntervalList}
          ></tm-open-interval>
        </div>
      </dile-card>

      <tm-crud-list-item-template
        disableDelete
        disableEdit
        @category-changed=${this.categoryChanged} 
        @delete-request=${this.doDelete}
        id="ellist"
        .filters=${this.filters}
        endpoint="/api/intervals"
        .itemTemplate=${(item) => html`<tm-interval-item .item=${item}></tm-interval-item>`}
        .moreActionsTemplate=${(item) => html`
          <categories-menu 
            
            intervalId="${item.id}" 
            .item="${item}"
          ></categories-menu>`}
      ></tm-crud-list-item-template>
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

  clickAddCategory(id) {
    return (e) => {
      console.log('quieres añadir una categoría en ', id);
    }
  }

  refreshIntervalList() {
    this.ellist.refresh();
  }

  categoryChanged(e) {
    console.log('checked change', e.detail, this);

    let categoryIntervalAjax = this.shadowRoot.getElementById('categoryIntervalAjax');
    categoryIntervalAjax.url = `/api/intervals/${e.detail.intervalId}/attach-category`;
    categoryIntervalAjax.data = {
      "category_id": e.detail.categoryId,
      "attached": e.detail.checked
    }
    categoryIntervalAjax.generateRequest();
  }

  doDelete(e) {
    console.log('do delete', e.detail);
  }
}
customElements.define('tm-project-detail', TmProjectDetail);
