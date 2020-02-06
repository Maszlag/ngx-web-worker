/**
 * @fileoverview added by tsickle
 * Generated from: lib/webworker.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
export class WebworkerService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vid29ya2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abi1hYmVsL25neC13ZWJ3b3JrZXIvIiwic291cmNlcyI6WyJsaWIvd2Vid29ya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSzNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFEN0I7UUFFVSwyQkFBc0IsR0FBRyxJQUFJLE9BQU8sRUFBNEIsQ0FBQztRQUNqRSx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBd0IsQ0FBQztJQXNFbkUsQ0FBQzs7Ozs7Ozs7SUFwRUMsR0FBRyxDQUFJLGNBQWlDLEVBQUUsSUFBVSxFQUFFLFdBQXFCOztjQUNuRSxHQUFHLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUM7UUFDbEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFFRCxNQUFNLENBQUMsR0FBVyxFQUFFLElBQVU7O2NBQ3RCLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUM7O2NBQ3hCLE9BQU8sR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQzs7Y0FDbkQsY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUM7UUFFekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFbkQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQzs7Ozs7O0lBRUQsU0FBUyxDQUFJLE9BQW1CO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVELFNBQVMsQ0FBQyxPQUFxQjtRQUM3QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7Ozs7SUFFTyxzQkFBc0IsQ0FBSSxNQUFjLEVBQUUsSUFBUztRQUN6RCxPQUFPLElBQUksT0FBTzs7Ozs7UUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7OztZQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVPLG9CQUFvQixDQUFDLEVBQU8sRUFBRSxXQUFxQjtRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTs7a0JBQ2xDLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUM7WUFDakQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7Ozs7O0lBRU8sZUFBZSxDQUFDLE9BQXlCLEVBQUUsV0FBcUI7O2NBQ2hFLGFBQWEsR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFOztjQUNsQyxpQkFBaUIsR0FBRzs7VUFFcEIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLGFBQWE7O0tBRXhEOztjQUNLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQztRQUN2RSxPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7OztJQUVPLG9CQUFvQixDQUFJLE9BQW1CO1FBQ2pEOzs7O1FBQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRU8sYUFBYSxDQUFJLE9BQW1COztjQUNwQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDbkQsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7OztZQXhFRixVQUFVOzs7Ozs7O0lBRVQsa0RBQXlFOzs7OztJQUN6RSw4Q0FBaUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbnR5cGUgQ2FsbGJhY2tGdW5jdGlvbiA9ICgpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBXZWJ3b3JrZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSB3b3JrZXJGdW5jdGlvblRvVXJsTWFwID0gbmV3IFdlYWtNYXA8Q2FsbGJhY2tGdW5jdGlvbiwgc3RyaW5nPigpO1xuICBwcml2YXRlIHByb21pc2VUb1dvcmtlck1hcCA9IG5ldyBXZWFrTWFwPFByb21pc2U8YW55PiwgV29ya2VyPigpO1xuXG4gIHJ1bjxUPih3b3JrZXJGdW5jdGlvbjogKGlucHV0OiBhbnkpID0+IFQsIGRhdGE/OiBhbnksIGVuYWJsZUFzeW5jPzogYm9vbGVhbik6IFByb21pc2U8VD4ge1xuICAgIGNvbnN0IHVybCA9IHRoaXMuZ2V0T3JDcmVhdGVXb3JrZXJVcmwod29ya2VyRnVuY3Rpb24sIGVuYWJsZUFzeW5jKTtcbiAgICByZXR1cm4gdGhpcy5ydW5VcmwodXJsLCBkYXRhKTtcbiAgfVxuXG4gIHJ1blVybCh1cmw6IHN0cmluZywgZGF0YT86IGFueSk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3Qgd29ya2VyID0gbmV3IFdvcmtlcih1cmwpO1xuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLmNyZWF0ZVByb21pc2VGb3JXb3JrZXIod29ya2VyLCBkYXRhKTtcbiAgICBjb25zdCBwcm9taXNlQ2xlYW5lciA9IHRoaXMuY3JlYXRlUHJvbWlzZUNsZWFuZXIocHJvbWlzZSk7XG5cbiAgICB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5zZXQocHJvbWlzZSwgd29ya2VyKTtcblxuICAgIHByb21pc2UudGhlbihwcm9taXNlQ2xlYW5lcikuY2F0Y2gocHJvbWlzZUNsZWFuZXIpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cblxuICB0ZXJtaW5hdGU8VD4ocHJvbWlzZTogUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiB0aGlzLnJlbW92ZVByb21pc2UocHJvbWlzZSk7XG4gIH1cblxuICBnZXRXb3JrZXIocHJvbWlzZTogUHJvbWlzZTxhbnk+KTogV29ya2VyIHtcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuZ2V0KHByb21pc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcm9taXNlRm9yV29ya2VyPFQ+KHdvcmtlcjogV29ya2VyLCBkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHJlc29sdmUoZXZlbnQuZGF0YSkpO1xuICAgICAgd29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgIHdvcmtlci5wb3N0TWVzc2FnZShkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T3JDcmVhdGVXb3JrZXJVcmwoZm46IGFueSwgZW5hYmxlQXN5bmM/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBpZiAoIXRoaXMud29ya2VyRnVuY3Rpb25Ub1VybE1hcC5oYXMoZm4pKSB7XG4gICAgICBjb25zdCB1cmwgPSB0aGlzLmNyZWF0ZVdvcmtlclVybChmbiwgZW5hYmxlQXN5bmMpO1xuICAgICAgdGhpcy53b3JrZXJGdW5jdGlvblRvVXJsTWFwLnNldChmbiwgdXJsKTtcbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLndvcmtlckZ1bmN0aW9uVG9VcmxNYXAuZ2V0KGZuKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlV29ya2VyVXJsKHJlc29sdmU6IENhbGxiYWNrRnVuY3Rpb24sIGVuYWJsZUFzeW5jPzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgY29uc3QgcmVzb2x2ZVN0cmluZyA9IHJlc29sdmUudG9TdHJpbmcoKTtcbiAgICBjb25zdCB3ZWJXb3JrZXJUZW1wbGF0ZSA9IGBcbiAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJHshZW5hYmxlQXN5bmMgPyAncG9zdE1lc3NhZ2UnIDogJyd9KCgke3Jlc29sdmVTdHJpbmd9KShlLmRhdGEpKTtcbiAgICAgIH0pO1xuICAgIGA7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFt3ZWJXb3JrZXJUZW1wbGF0ZV0sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSk7XG4gICAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVByb21pc2VDbGVhbmVyPFQ+KHByb21pc2U6IFByb21pc2U8VD4pOiAoaW5wdXQ6IGFueSkgPT4gVCB7XG4gICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5yZW1vdmVQcm9taXNlKHByb21pc2UpO1xuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZVByb21pc2U8VD4ocHJvbWlzZTogUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgIGNvbnN0IHdvcmtlciA9IHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLmdldChwcm9taXNlKTtcbiAgICBpZiAod29ya2VyKSB7XG4gICAgICB3b3JrZXIudGVybWluYXRlKCk7XG4gICAgfVxuICAgIHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLmRlbGV0ZShwcm9taXNlKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxufVxuIl19