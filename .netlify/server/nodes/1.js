

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.94b36672.js","_app/immutable/chunks/scheduler.180ab86d.js","_app/immutable/chunks/index.610fc1f7.js","_app/immutable/chunks/stores.b164b83e.js","_app/immutable/chunks/singletons.cc96631d.js"];
export const stylesheets = [];
export const fonts = [];
