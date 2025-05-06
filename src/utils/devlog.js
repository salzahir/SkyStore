export function devLog(...args) {
    if (process.env.NODE_ENV === 'development') {
        console.log('[devLog]:', ...args);
    }
}