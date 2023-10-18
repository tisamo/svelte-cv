export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","robots.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.cda0d40b.js","app":"_app/immutable/entry/app.e6218068.js","imports":["_app/immutable/entry/start.cda0d40b.js","_app/immutable/chunks/scheduler.180ab86d.js","_app/immutable/chunks/singletons.cc96631d.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/entry/app.e6218068.js","_app/immutable/chunks/scheduler.180ab86d.js","_app/immutable/chunks/index.610fc1f7.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();
