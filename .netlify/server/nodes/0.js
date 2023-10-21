

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.1077100d.js","_app/immutable/chunks/scheduler.180ab86d.js","_app/immutable/chunks/index.19257a35.js"];
export const stylesheets = ["_app/immutable/assets/0.029bd4d4.css"];
export const fonts = [];
