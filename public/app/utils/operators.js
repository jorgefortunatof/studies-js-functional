export const parcialize = (fn, ...args) => fn.bind(null, ...args);

export const compose = (...fns) => value => fns.reduceRight((prev, fn) => fn(prev), value);

export const pipe = (...fns) => value => fns.reduce((prev, fn) => fn(prev), value);

export const takeUntil = (times, fn) =>
    () => times-- > 0 && fn();

export const debounceTime = (milliseconds, fn) => {
    let timer = null;

    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, milliseconds);
    }
}
