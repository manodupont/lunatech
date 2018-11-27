
let listeners = {};

export function middleware(store) {
	return next => {
		return action => {
			let l = listeners[action.type];
			if (l)
				l.forEach(fn => fn(store, action, store.getState()));
			return next(action);
		  }
	}
}

export function on(action, fn) {
	listeners[action] = listeners[action] || [];
	let listener = listeners[action].find(f => f === fn);
	if (listener)
		return ;
	listeners[action].push(fn);
}

export function off(action, fn) {
	let l = listeners[action];
	if (!l)
		return ;
	if (!fn) {
		listeners[action] = [];
		return ;
	}
	let f = l.indexOf(f => f === fn);
	if (f !== -1)
		l.splice(f, 1);
}