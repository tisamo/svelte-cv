import { init } from '../serverless.js';

export const handler = init((() => {
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
		client: {"start":"_app/immutable/entry/start.b2f89467.js","app":"_app/immutable/entry/app.8fcf2fca.js","imports":["_app/immutable/entry/start.b2f89467.js","_app/immutable/chunks/scheduler.180ab86d.js","_app/immutable/chunks/singletons.6592263e.js","_app/immutable/chunks/parse.7d180a0f.js","_app/immutable/entry/app.8fcf2fca.js","_app/immutable/chunks/scheduler.180ab86d.js","_app/immutable/chunks/index.19257a35.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})());
