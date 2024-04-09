export const FeedbackMixin = (Superclass) => class extends Superclass {
  positiveFeedback(msg) { 
    this.dispatchEvent(new CustomEvent('positive-feedback', { 
      bubbles: true,
      composed: true,
      detail: { msg } 
    }));
  }

  negativeFeedback(msg) {
    //console.log('mixin negative', msg);
    this.dispatchEvent(new CustomEvent('negative-feedback', { 
      bubbles: true,
      composed: true,
      detail: { msg } 
    }));
  }

  startLoading() {
    //console.log('inicio de carga');
    this.dispatchEvent(new CustomEvent('start-loading-feedback', { 
      bubbles: true,
      composed: true,
    }));
  }

  stopLoading() {
    this.dispatchEvent(new CustomEvent('stop-loading-feedback', { 
      bubbles: true,
      composed: true,
    }));
  }
}