

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.2cad5da1.js","_app/immutable/chunks/scheduler.180ab86d.js","_app/immutable/chunks/index.19257a35.js","_app/immutable/chunks/stores.2a602284.js","_app/immutable/chunks/singletons.6592263e.js"];
export const stylesheets = [];
export const fonts = [];
