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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vid29ya2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2Vid29ya2VyLyIsInNvdXJjZXMiOlsibGliL3dlYndvcmtlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUszQyxNQUFNLE9BQU8sZ0JBQWdCO0lBRDdCO1FBRVUsMkJBQXNCLEdBQUcsSUFBSSxPQUFPLEVBQTRCLENBQUM7UUFDakUsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQXdCLENBQUM7SUFzRW5FLENBQUM7Ozs7Ozs7O0lBcEVDLEdBQUcsQ0FBSSxjQUFpQyxFQUFFLElBQVUsRUFBRSxXQUFxQjs7Y0FDbkUsR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBRUQsTUFBTSxDQUFDLEdBQVcsRUFBRSxJQUFVOztjQUN0QixNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDOztjQUN4QixPQUFPLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7O2NBQ25ELGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDO1FBRXpELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUVELFNBQVMsQ0FBSSxPQUFtQjtRQUM5QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsT0FBcUI7UUFDN0IsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7Ozs7O0lBRU8sc0JBQXNCLENBQUksTUFBYyxFQUFFLElBQVM7UUFDekQsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDeEMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVM7Ozs7WUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFTyxvQkFBb0IsQ0FBQyxFQUFPLEVBQUUsV0FBcUI7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7O2tCQUNsQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDO1lBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7OztJQUVPLGVBQWUsQ0FBQyxPQUF5QixFQUFFLFdBQXFCOztjQUNoRSxhQUFhLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRTs7Y0FDbEMsaUJBQWlCLEdBQUc7O1VBRXBCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxhQUFhOztLQUV4RDs7Y0FDSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUM7UUFDdkUsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7Ozs7SUFFTyxvQkFBb0IsQ0FBSSxPQUFtQjtRQUNqRDs7OztRQUFPLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFDO0lBQ0osQ0FBQzs7Ozs7OztJQUVPLGFBQWEsQ0FBSSxPQUFtQjs7Y0FDcEMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7WUF4RUYsVUFBVTs7Ozs7OztJQUVULGtEQUF5RTs7Ozs7SUFDekUsOENBQWlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG50eXBlIENhbGxiYWNrRnVuY3Rpb24gPSAoKSA9PiB2b2lkO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2Vid29ya2VyU2VydmljZSB7XG4gIHByaXZhdGUgd29ya2VyRnVuY3Rpb25Ub1VybE1hcCA9IG5ldyBXZWFrTWFwPENhbGxiYWNrRnVuY3Rpb24sIHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBwcm9taXNlVG9Xb3JrZXJNYXAgPSBuZXcgV2Vha01hcDxQcm9taXNlPGFueT4sIFdvcmtlcj4oKTtcblxuICBydW48VD4od29ya2VyRnVuY3Rpb246IChpbnB1dDogYW55KSA9PiBULCBkYXRhPzogYW55LCBlbmFibGVBc3luYz86IGJvb2xlYW4pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldE9yQ3JlYXRlV29ya2VyVXJsKHdvcmtlckZ1bmN0aW9uLCBlbmFibGVBc3luYyk7XG4gICAgcmV0dXJuIHRoaXMucnVuVXJsKHVybCwgZGF0YSk7XG4gIH1cblxuICBydW5VcmwodXJsOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHdvcmtlciA9IG5ldyBXb3JrZXIodXJsKTtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5jcmVhdGVQcm9taXNlRm9yV29ya2VyKHdvcmtlciwgZGF0YSk7XG4gICAgY29uc3QgcHJvbWlzZUNsZWFuZXIgPSB0aGlzLmNyZWF0ZVByb21pc2VDbGVhbmVyKHByb21pc2UpO1xuXG4gICAgdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuc2V0KHByb21pc2UsIHdvcmtlcik7XG5cbiAgICBwcm9taXNlLnRoZW4ocHJvbWlzZUNsZWFuZXIpLmNhdGNoKHByb21pc2VDbGVhbmVyKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgdGVybWluYXRlPFQ+KHByb21pc2U6IFByb21pc2U8VD4pOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVQcm9taXNlKHByb21pc2UpO1xuICB9XG5cbiAgZ2V0V29ya2VyKHByb21pc2U6IFByb21pc2U8YW55Pik6IFdvcmtlciB7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLmdldChwcm9taXNlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUHJvbWlzZUZvcldvcmtlcjxUPih3b3JrZXI6IFdvcmtlciwgZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiByZXNvbHZlKGV2ZW50LmRhdGEpKTtcbiAgICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE9yQ3JlYXRlV29ya2VyVXJsKGZuOiBhbnksIGVuYWJsZUFzeW5jPzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLndvcmtlckZ1bmN0aW9uVG9VcmxNYXAuaGFzKGZuKSkge1xuICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVXb3JrZXJVcmwoZm4sIGVuYWJsZUFzeW5jKTtcbiAgICAgIHRoaXMud29ya2VyRnVuY3Rpb25Ub1VybE1hcC5zZXQoZm4sIHVybCk7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy53b3JrZXJGdW5jdGlvblRvVXJsTWFwLmdldChmbik7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdvcmtlclVybChyZXNvbHZlOiBDYWxsYmFja0Z1bmN0aW9uLCBlbmFibGVBc3luYz86IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGNvbnN0IHJlc29sdmVTdHJpbmcgPSByZXNvbHZlLnRvU3RyaW5nKCk7XG4gICAgY29uc3Qgd2ViV29ya2VyVGVtcGxhdGUgPSBgXG4gICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICR7IWVuYWJsZUFzeW5jID8gJ3Bvc3RNZXNzYWdlJyA6ICcnfSgoJHtyZXNvbHZlU3RyaW5nfSkoZS5kYXRhKSk7XG4gICAgICB9KTtcbiAgICBgO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbd2ViV29ya2VyVGVtcGxhdGVdLCB7IHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnIH0pO1xuICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcm9taXNlQ2xlYW5lcjxUPihwcm9taXNlOiBQcm9taXNlPFQ+KTogKGlucHV0OiBhbnkpID0+IFQge1xuICAgIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlUHJvbWlzZShwcm9taXNlKTtcbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVQcm9taXNlPFQ+KHByb21pc2U6IFByb21pc2U8VD4pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB3b3JrZXIgPSB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5nZXQocHJvbWlzZSk7XG4gICAgaWYgKHdvcmtlcikge1xuICAgICAgd29ya2VyLnRlcm1pbmF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5kZWxldGUocHJvbWlzZSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbn1cbiJdfQ==