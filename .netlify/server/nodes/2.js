import * as universal from '../entries/pages/_page.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/2.4cdb2542.js","_app/immutable/chunks/scheduler.180ab86d.js","_app/immutable/chunks/index.19257a35.js","_app/immutable/chunks/singletons.6592263e.js","_app/immutable/chunks/stores.2a602284.js","_app/immutable/chunks/parse.7d180a0f.js"];
export const stylesheets = ["_app/immutable/assets/2.19ecfee9.css"];
export const fonts = [];
