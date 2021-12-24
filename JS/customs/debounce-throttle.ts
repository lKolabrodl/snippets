/** один раз за n */
function debounce(callback: (...args: any) => any, delay: number): (...args: any) => any {
    let time: number;
    return function (...args: any) {
        clearTimeout(time);
        time = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    }
}

/** один раз за n вызывается, сразу и в конце   */
function throttle(callback: (...args: any) => any, delay: number) {
    let _this = null;
    let _args = null;
    let wait: boolean = false;

    return function wrapper(...args: any) {
        if (wait) {
            _args = args;
            _this = this;
        }
        callback.apply(this, args);
        wait = true;
        setTimeout(() => {
            wait = false
            if (_this) {
                wrapper.apply(_this, args);
                _this = null;
            }
        }, delay);
    }
}
