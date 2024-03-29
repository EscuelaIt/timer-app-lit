export const FeedbackMixin = (Superclass) => class extends Superclass {
  positiveFeedback(msg) { 
    this.dispatchEvent(new CustomEvent('positive-feedback', { 
      bubbles: true,
      composed: true,
      detail: { msg } 
    }));
  }

  negativeFeedback(msg) {
    console.log('mixin negative', msg);
    this.dispatchEvent(new CustomEvent('negative-feedback', { 
      bubbles: true,
      composed: true,
      detail: { msg } 
    }));
  }


}