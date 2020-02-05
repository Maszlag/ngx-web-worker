/**
 * @fileoverview added by tsickle
 * Generated from: lib/webworker.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
var WebworkerService = /** @class */ (function () {
    function WebworkerService() {
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
    WebworkerService.prototype.run = /**
     * @template T
     * @param {?} workerFunction
     * @param {?=} data
     * @param {?=} enableAsync
     * @return {?}
     */
    function (workerFunction, data, enableAsync) {
        /** @type {?} */
        var url = this.getOrCreateWorkerUrl(workerFunction, enableAsync);
        return this.runUrl(url, data);
    };
    /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    WebworkerService.prototype.runUrl = /**
     * @param {?} url
     * @param {?=} data
     * @return {?}
     */
    function (url, data) {
        /** @type {?} */
        var worker = new Worker(url);
        /** @type {?} */
        var promise = this.createPromiseForWorker(worker, data);
        /** @type {?} */
        var promiseCleaner = this.createPromiseCleaner(promise);
        this.promiseToWorkerMap.set(promise, worker);
        promise.then(promiseCleaner).catch(promiseCleaner);
        return promise;
    };
    /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebworkerService.prototype.terminate = /**
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        return this.removePromise(promise);
    };
    /**
     * @param {?} promise
     * @return {?}
     */
    WebworkerService.prototype.getWorker = /**
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        return this.promiseToWorkerMap.get(promise);
    };
    /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    WebworkerService.prototype.createPromiseForWorker = /**
     * @private
     * @template T
     * @param {?} worker
     * @param {?} data
     * @return {?}
     */
    function (worker, data) {
        return new Promise((/**
         * @param {?} resolve
         * @param {?} reject
         * @return {?}
         */
        function (resolve, reject) {
            worker.addEventListener('message', (/**
             * @param {?} event
             * @return {?}
             */
            function (event) { return resolve(event.data); }));
            worker.addEventListener('error', reject);
            worker.postMessage(data);
        }));
    };
    /**
     * @private
     * @param {?} fn
     * @param {?=} enableAsync
     * @return {?}
     */
    WebworkerService.prototype.getOrCreateWorkerUrl = /**
     * @private
     * @param {?} fn
     * @param {?=} enableAsync
     * @return {?}
     */
    function (fn, enableAsync) {
        if (!this.workerFunctionToUrlMap.has(fn)) {
            /** @type {?} */
            var url = this.createWorkerUrl(fn, enableAsync);
            this.workerFunctionToUrlMap.set(fn, url);
            return url;
        }
        return this.workerFunctionToUrlMap.get(fn);
    };
    /**
     * @private
     * @param {?} resolve
     * @param {?=} enableAsync
     * @return {?}
     */
    WebworkerService.prototype.createWorkerUrl = /**
     * @private
     * @param {?} resolve
     * @param {?=} enableAsync
     * @return {?}
     */
    function (resolve, enableAsync) {
        /** @type {?} */
        var resolveString = resolve.toString();
        /** @type {?} */
        var webWorkerTemplate = "\n      self.addEventListener('message', function(e) {\n        " + (!enableAsync ? 'postMessage' : '') + "((" + resolveString + ")(e.data));\n      });\n    ";
        /** @type {?} */
        var blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    };
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebworkerService.prototype.createPromiseCleaner = /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        var _this = this;
        return (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this.removePromise(promise);
            return event;
        });
    };
    /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    WebworkerService.prototype.removePromise = /**
     * @private
     * @template T
     * @param {?} promise
     * @return {?}
     */
    function (promise) {
        /** @type {?} */
        var worker = this.promiseToWorkerMap.get(promise);
        if (worker) {
            worker.terminate();
        }
        this.promiseToWorkerMap.delete(promise);
        return promise;
    };
    WebworkerService.decorators = [
        { type: Injectable }
    ];
    return WebworkerService;
}());
export { WebworkerService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vid29ya2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtd2Vid29ya2VyLyIsInNvdXJjZXMiOlsibGliL3dlYndvcmtlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUkzQztJQUFBO1FBRVUsMkJBQXNCLEdBQUcsSUFBSSxPQUFPLEVBQTRCLENBQUM7UUFDakUsdUJBQWtCLEdBQUcsSUFBSSxPQUFPLEVBQXdCLENBQUM7SUFzRW5FLENBQUM7Ozs7Ozs7O0lBcEVDLDhCQUFHOzs7Ozs7O0lBQUgsVUFBTyxjQUFpQyxFQUFFLElBQVUsRUFBRSxXQUFxQjs7WUFDbkUsR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDO1FBQ2xFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBRUQsaUNBQU07Ozs7O0lBQU4sVUFBTyxHQUFXLEVBQUUsSUFBVTs7WUFDdEIsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQzs7WUFDeEIsT0FBTyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDOztZQUNuRCxjQUFjLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztRQUV6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUU3QyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVuRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFRCxvQ0FBUzs7Ozs7SUFBVCxVQUFhLE9BQW1CO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxDQUFDOzs7OztJQUVELG9DQUFTOzs7O0lBQVQsVUFBVSxPQUFxQjtRQUM3QixPQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQzs7Ozs7Ozs7SUFFTyxpREFBc0I7Ozs7Ozs7SUFBOUIsVUFBa0MsTUFBYyxFQUFFLElBQVM7UUFDekQsT0FBTyxJQUFJLE9BQU87Ozs7O1FBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUzs7OztZQUFFLFVBQUMsS0FBSyxJQUFLLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBbkIsQ0FBbUIsRUFBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7SUFFTywrQ0FBb0I7Ozs7OztJQUE1QixVQUE2QixFQUFPLEVBQUUsV0FBcUI7UUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7O2dCQUNsQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDO1lBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxPQUFPLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7Ozs7OztJQUVPLDBDQUFlOzs7Ozs7SUFBdkIsVUFBd0IsT0FBeUIsRUFBRSxXQUFxQjs7WUFDaEUsYUFBYSxHQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUU7O1lBQ2xDLGlCQUFpQixHQUFHLHNFQUVwQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQUssYUFBYSxpQ0FFeEQ7O1lBQ0ssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDO1FBQ3ZFLE9BQU8sR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDOzs7Ozs7O0lBRU8sK0NBQW9COzs7Ozs7SUFBNUIsVUFBZ0MsT0FBbUI7UUFBbkQsaUJBS0M7UUFKQzs7OztRQUFPLFVBQUMsS0FBSztZQUNYLEtBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLEVBQUM7SUFDSixDQUFDOzs7Ozs7O0lBRU8sd0NBQWE7Ozs7OztJQUFyQixVQUF5QixPQUFtQjs7WUFDcEMsTUFBTSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQ25ELElBQUksTUFBTSxFQUFFO1lBQ1YsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCO1FBQ0QsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOztnQkF4RUYsVUFBVTs7SUF5RVgsdUJBQUM7Q0FBQSxBQXpFRCxJQXlFQztTQXhFWSxnQkFBZ0I7Ozs7OztJQUMzQixrREFBeUU7Ozs7O0lBQ3pFLDhDQUFpRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxudHlwZSBDYWxsYmFja0Z1bmN0aW9uID0gKCkgPT4gdm9pZDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdlYndvcmtlclNlcnZpY2Uge1xuICBwcml2YXRlIHdvcmtlckZ1bmN0aW9uVG9VcmxNYXAgPSBuZXcgV2Vha01hcDxDYWxsYmFja0Z1bmN0aW9uLCBzdHJpbmc+KCk7XG4gIHByaXZhdGUgcHJvbWlzZVRvV29ya2VyTWFwID0gbmV3IFdlYWtNYXA8UHJvbWlzZTxhbnk+LCBXb3JrZXI+KCk7XG5cbiAgcnVuPFQ+KHdvcmtlckZ1bmN0aW9uOiAoaW5wdXQ6IGFueSkgPT4gVCwgZGF0YT86IGFueSwgZW5hYmxlQXN5bmM/OiBib29sZWFuKTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3QgdXJsID0gdGhpcy5nZXRPckNyZWF0ZVdvcmtlclVybCh3b3JrZXJGdW5jdGlvbiwgZW5hYmxlQXN5bmMpO1xuICAgIHJldHVybiB0aGlzLnJ1blVybCh1cmwsIGRhdGEpO1xuICB9XG5cbiAgcnVuVXJsKHVybDogc3RyaW5nLCBkYXRhPzogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICBjb25zdCB3b3JrZXIgPSBuZXcgV29ya2VyKHVybCk7XG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuY3JlYXRlUHJvbWlzZUZvcldvcmtlcih3b3JrZXIsIGRhdGEpO1xuICAgIGNvbnN0IHByb21pc2VDbGVhbmVyID0gdGhpcy5jcmVhdGVQcm9taXNlQ2xlYW5lcihwcm9taXNlKTtcblxuICAgIHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLnNldChwcm9taXNlLCB3b3JrZXIpO1xuXG4gICAgcHJvbWlzZS50aGVuKHByb21pc2VDbGVhbmVyKS5jYXRjaChwcm9taXNlQ2xlYW5lcik7XG5cbiAgICByZXR1cm4gcHJvbWlzZTtcbiAgfVxuXG4gIHRlcm1pbmF0ZTxUPihwcm9taXNlOiBQcm9taXNlPFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucmVtb3ZlUHJvbWlzZShwcm9taXNlKTtcbiAgfVxuXG4gIGdldFdvcmtlcihwcm9taXNlOiBQcm9taXNlPGFueT4pOiBXb3JrZXIge1xuICAgIHJldHVybiB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5nZXQocHJvbWlzZSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVByb21pc2VGb3JXb3JrZXI8VD4od29ya2VyOiBXb3JrZXIsIGRhdGE6IGFueSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChldmVudCkgPT4gcmVzb2x2ZShldmVudC5kYXRhKSk7XG4gICAgICB3b3JrZXIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCByZWplY3QpO1xuICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRPckNyZWF0ZVdvcmtlclVybChmbjogYW55LCBlbmFibGVBc3luYz86IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGlmICghdGhpcy53b3JrZXJGdW5jdGlvblRvVXJsTWFwLmhhcyhmbikpIHtcbiAgICAgIGNvbnN0IHVybCA9IHRoaXMuY3JlYXRlV29ya2VyVXJsKGZuLCBlbmFibGVBc3luYyk7XG4gICAgICB0aGlzLndvcmtlckZ1bmN0aW9uVG9VcmxNYXAuc2V0KGZuLCB1cmwpO1xuICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud29ya2VyRnVuY3Rpb25Ub1VybE1hcC5nZXQoZm4pO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVXb3JrZXJVcmwocmVzb2x2ZTogQ2FsbGJhY2tGdW5jdGlvbiwgZW5hYmxlQXN5bmM/OiBib29sZWFuKTogc3RyaW5nIHtcbiAgICBjb25zdCByZXNvbHZlU3RyaW5nID0gcmVzb2x2ZS50b1N0cmluZygpO1xuICAgIGNvbnN0IHdlYldvcmtlclRlbXBsYXRlID0gYFxuICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkeyFlbmFibGVBc3luYyA/ICdwb3N0TWVzc2FnZScgOiAnJ30oKCR7cmVzb2x2ZVN0cmluZ30pKGUuZGF0YSkpO1xuICAgICAgfSk7XG4gICAgYDtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3dlYldvcmtlclRlbXBsYXRlXSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KTtcbiAgICByZXR1cm4gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUHJvbWlzZUNsZWFuZXI8VD4ocHJvbWlzZTogUHJvbWlzZTxUPik6IChpbnB1dDogYW55KSA9PiBUIHtcbiAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnJlbW92ZVByb21pc2UocHJvbWlzZSk7XG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlUHJvbWlzZTxUPihwcm9taXNlOiBQcm9taXNlPFQ+KTogUHJvbWlzZTxUPiB7XG4gICAgY29uc3Qgd29ya2VyID0gdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuZ2V0KHByb21pc2UpO1xuICAgIGlmICh3b3JrZXIpIHtcbiAgICAgIHdvcmtlci50ZXJtaW5hdGUoKTtcbiAgICB9XG4gICAgdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuZGVsZXRlKHByb21pc2UpO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG59XG4iXX0=