const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const par = new URLSearchParams(location.search);

HTMLElement.prototype.$ = HTMLElement.prototype.querySelector;
HTMLElement.prototype.$$ = HTMLElement.prototype.querySelectorAll;

export {$, $$, par};