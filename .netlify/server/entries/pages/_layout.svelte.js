import { c as create_ssr_component } from "../../chunks/ssr.js";
const styles = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".app.svelte-1bgji90{display:flex;flex-direction:column;min-height:100vh}main.svelte-1bgji90{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:64rem;margin:0 auto;box-sizing:border-box}@media(min-width: 480px){}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="app svelte-1bgji90"><main class="svelte-1bgji90">${slots.default ? slots.default({}) : ``}</main> </div>`;
});
export {
  Layout as default
};
