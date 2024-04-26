import { state } from '../lib/state';

export const StateMixin = (Superclass) => class extends Superclass {
  constructor() {
    super();
    this.stateChangeHandlerBind = this.stateChangeHandler.bind(this);
  }
  connectedCallback() {
    super.connectedCallback();
    state.addEventListener('state-changed', this.stateChangeHandlerBind);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    state.removeEventListener('state-changed', this.stateChangeHandlerBind);
  }
  stateChangeHandler({state}) {
    //console.log(state);
    this.stateChanged(state);
  }

  stateChanged(state) {
    //
  }

  setState(newState) {
    state.setState(old => ({...old, ...newState}));
  }

  getState() {
    return state.getState();
  }
}