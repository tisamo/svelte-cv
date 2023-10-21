import { c as create_ssr_component } from "../../chunks/ssr.js";
const styles = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".app.svelte-1frt5ts{display:flex;flex-direction:column;min-height:100vh}main.svelte-1frt5ts{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:64rem;margin:0 auto;box-sizing:border-box}.too-small.svelte-1frt5ts{display:none}@media(min-width: 480px){}@media(max-width: 950px){.app.svelte-1frt5ts{display:none}.too-small.svelte-1frt5ts{display:block;margin-top:100px;color:var(--red);font-weight:800;text-align:center;text-transform:uppercase}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="too-small svelte-1frt5ts" data-svelte-h="svelte-15hlqzt">This design made for desktop only.</div> <div class="app svelte-1frt5ts"><main class="svelte-1frt5ts">${slots.default ? slots.default({}) : ``}</main> </div>`;
});
export {
  Layout as default
};
