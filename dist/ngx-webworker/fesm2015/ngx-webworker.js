import { Injectable } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/webworker.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebworkerService {
    constructor() {
        this.workerFunctionToUrlMap = new WeakMap();
        this.promiseToWorkerMap = new WeakMap();
    }
    /**
     * @template T
     * @param {?} workerFunction
     * @param {?=} data
     * @param {?=} enableAsync
     * @return {?}
     */
    run(workerFunction, data, enableAsync) {
        /** @type {?} */
        const url = this.getOrCreateWorkerUrl(workerFunction, enableAsync);
        return this.runUrl(url, data);
    }
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    runUrl(url, data) {
        /** @type {?} */
        const worker = new Worker(url);
        /** @type {?} */
        const promise = this.createPromiseForWorker(worker, data);
        /** @type {?} */
        const promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    }
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    terminate(promise) {
        return this.removePromise(promise);
    }
    /**
     * @param {?} promise
     * @return {?}
     */
    getWorker(promise) {
        return this.promiseToWorkerMap.get(promise);
    }
    /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    createPromiseForWorker(worker, data) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        (resolve, reject) => {
            worker.addEventListener('message', (/**
             * @param {?} event
             * @return {?}
             */
            (event) => resolve(event.data)));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        }));
    }
    /**
     * @private
     * @param {?} fn
     * @param {?=} enableAsync
     * @return {?}
     */
    getOrCreateWorkerUrl(fn, enableAsync) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            /** @type {?} */
            const url = this.createWorkerUrl(fn, enableAsync);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return this.workerFunctionToUrlMap.get(fn);
    }
    /**
     * @private
     * @param {?} resolve
     * @param {?=} enableAsync
     * @return {?}
     */
    createWorkerUrl(resolve, enableAsync) {
        /** @type {?} */
        const resolveString = resolve.toString();
        /** @type {?} */
        const webWorkerTemplate = `
      self.addEventListener('message', function(e) {
        ${!enableAsync ? 'postMessage' : ''}((${resolveString})(e.data));
      });
    `;
        /** @type {?} */
        const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    }
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    createPromiseCleaner(promise) {
        return (/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            this.removePromise(promise);
            return event;
        });
    }
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    removePromise(promise) {
        /** @type {?} */
        const worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    }
}
WebworkerService.decorators = [
    { type: Injectable }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    WebworkerService.prototype.workerFunctionToUrlMap;
    /**
     * @type {?}
     * @private
     */
    WebworkerService.prototype.promiseToWorkerMap;
}

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngx-webworker.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { WebworkerService };
//# sourceMappingURL=ngx-webworker.js.map
