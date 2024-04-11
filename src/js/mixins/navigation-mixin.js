export const NavigationMixin = (Superclass) => class extends Superclass {
  goToUrl(url) { 
    this.dispatchEvent(new CustomEvent('tm-navigate', { 
      bubbles: true,
      composed: true,
      detail: { url } 
    }));
  }  
}