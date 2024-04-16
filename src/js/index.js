import '../css/style.css';

async function loadPolyfills() {
  if (!globalThis.URLPattern) {
    await import("urlpattern-polyfill");
  }
}

async function main() {
  await loadPolyfills();
  await import('./components/tm-app');
}

main();