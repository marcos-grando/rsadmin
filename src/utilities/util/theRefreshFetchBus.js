const bus = new EventTarget();

export function refreshFetch(key, handler) {
    const h = () => handler();
    bus.addEventListener(key, h);
    return () => bus.removeEventListener(key, h);
};

export function callRefreshFetch(key) {
    bus.dispatchEvent(new Event(key));
};