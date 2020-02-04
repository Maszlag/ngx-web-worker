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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Vid29ya2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Abml0aW5rcm1yL25neC13ZWJ3b3JrZXIvIiwic291cmNlcyI6WyJsaWIvd2Vid29ya2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDO0lBQUE7UUFFVSwyQkFBc0IsR0FBRyxJQUFJLE9BQU8sRUFBNEIsQ0FBQztRQUNqRSx1QkFBa0IsR0FBRyxJQUFJLE9BQU8sRUFBd0IsQ0FBQztJQXNFbkUsQ0FBQzs7Ozs7Ozs7SUFwRUMsOEJBQUc7Ozs7Ozs7SUFBSCxVQUFPLGNBQWlDLEVBQUUsSUFBVSxFQUFFLFdBQXFCOztZQUNuRSxHQUFHLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUM7UUFDbEUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDOzs7Ozs7SUFFRCxpQ0FBTTs7Ozs7SUFBTixVQUFPLEdBQVcsRUFBRSxJQUFVOztZQUN0QixNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDOztZQUN4QixPQUFPLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUM7O1lBQ25ELGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDO1FBRXpELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRW5ELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7OztJQUVELG9DQUFTOzs7OztJQUFULFVBQWEsT0FBbUI7UUFDOUIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsb0NBQVM7Ozs7SUFBVCxVQUFVLE9BQXFCO1FBQzdCLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7OztJQUVPLGlEQUFzQjs7Ozs7OztJQUE5QixVQUFrQyxNQUFjLEVBQUUsSUFBUztRQUN6RCxPQUFPLElBQUksT0FBTzs7Ozs7UUFBSSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3BDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTOzs7O1lBQUUsVUFBQyxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFuQixDQUFtQixFQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN6QyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUMsRUFBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7OztJQUVPLCtDQUFvQjs7Ozs7O0lBQTVCLFVBQTZCLEVBQU8sRUFBRSxXQUFxQjtRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTs7Z0JBQ2xDLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUM7WUFDakQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDekMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7Ozs7O0lBRU8sMENBQWU7Ozs7OztJQUF2QixVQUF3QixPQUF5QixFQUFFLFdBQXFCOztZQUNoRSxhQUFhLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRTs7WUFDbEMsaUJBQWlCLEdBQUcsc0VBRXBCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBSyxhQUFhLGlDQUV4RDs7WUFDSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLENBQUM7UUFDdkUsT0FBTyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7Ozs7SUFFTywrQ0FBb0I7Ozs7OztJQUE1QixVQUFnQyxPQUFtQjtRQUFuRCxpQkFLQztRQUpDOzs7O1FBQU8sVUFBQyxLQUFLO1lBQ1gsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsRUFBQztJQUNKLENBQUM7Ozs7Ozs7SUFFTyx3Q0FBYTs7Ozs7O0lBQXJCLFVBQXlCLE9BQW1COztZQUNwQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDbkQsSUFBSSxNQUFNLEVBQUU7WUFDVixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7O2dCQXhFRixVQUFVOztJQXlFWCx1QkFBQztDQUFBLEFBekVELElBeUVDO1NBeEVZLGdCQUFnQjs7Ozs7O0lBQzNCLGtEQUF5RTs7Ozs7SUFDekUsOENBQWlFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG50eXBlIENhbGxiYWNrRnVuY3Rpb24gPSAoKSA9PiB2b2lkO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2Vid29ya2VyU2VydmljZSB7XG4gIHByaXZhdGUgd29ya2VyRnVuY3Rpb25Ub1VybE1hcCA9IG5ldyBXZWFrTWFwPENhbGxiYWNrRnVuY3Rpb24sIHN0cmluZz4oKTtcbiAgcHJpdmF0ZSBwcm9taXNlVG9Xb3JrZXJNYXAgPSBuZXcgV2Vha01hcDxQcm9taXNlPGFueT4sIFdvcmtlcj4oKTtcblxuICBydW48VD4od29ya2VyRnVuY3Rpb246IChpbnB1dDogYW55KSA9PiBULCBkYXRhPzogYW55LCBlbmFibGVBc3luYz86IGJvb2xlYW4pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB1cmwgPSB0aGlzLmdldE9yQ3JlYXRlV29ya2VyVXJsKHdvcmtlckZ1bmN0aW9uLCBlbmFibGVBc3luYyk7XG4gICAgcmV0dXJuIHRoaXMucnVuVXJsKHVybCwgZGF0YSk7XG4gIH1cblxuICBydW5VcmwodXJsOiBzdHJpbmcsIGRhdGE/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICAgIGNvbnN0IHdvcmtlciA9IG5ldyBXb3JrZXIodXJsKTtcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5jcmVhdGVQcm9taXNlRm9yV29ya2VyKHdvcmtlciwgZGF0YSk7XG4gICAgY29uc3QgcHJvbWlzZUNsZWFuZXIgPSB0aGlzLmNyZWF0ZVByb21pc2VDbGVhbmVyKHByb21pc2UpO1xuXG4gICAgdGhpcy5wcm9taXNlVG9Xb3JrZXJNYXAuc2V0KHByb21pc2UsIHdvcmtlcik7XG5cbiAgICBwcm9taXNlLnRoZW4ocHJvbWlzZUNsZWFuZXIpLmNhdGNoKHByb21pc2VDbGVhbmVyKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgdGVybWluYXRlPFQ+KHByb21pc2U6IFByb21pc2U8VD4pOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVQcm9taXNlKHByb21pc2UpO1xuICB9XG5cbiAgZ2V0V29ya2VyKHByb21pc2U6IFByb21pc2U8YW55Pik6IFdvcmtlciB7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZVRvV29ya2VyTWFwLmdldChwcm9taXNlKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUHJvbWlzZUZvcldvcmtlcjxUPih3b3JrZXI6IFdvcmtlciwgZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiByZXNvbHZlKGV2ZW50LmRhdGEpKTtcbiAgICAgIHdvcmtlci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIHJlamVjdCk7XG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2UoZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldE9yQ3JlYXRlV29ya2VyVXJsKGZuOiBhbnksIGVuYWJsZUFzeW5jPzogYm9vbGVhbik6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLndvcmtlckZ1bmN0aW9uVG9VcmxNYXAuaGFzKGZuKSkge1xuICAgICAgY29uc3QgdXJsID0gdGhpcy5jcmVhdGVXb3JrZXJVcmwoZm4sIGVuYWJsZUFzeW5jKTtcbiAgICAgIHRoaXMud29ya2VyRnVuY3Rpb25Ub1VybE1hcC5zZXQoZm4sIHVybCk7XG4gICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy53b3JrZXJGdW5jdGlvblRvVXJsTWFwLmdldChmbik7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVdvcmtlclVybChyZXNvbHZlOiBDYWxsYmFja0Z1bmN0aW9uLCBlbmFibGVBc3luYz86IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGNvbnN0IHJlc29sdmVTdHJpbmcgPSByZXNvbHZlLnRvU3RyaW5nKCk7XG4gICAgY29uc3Qgd2ViV29ya2VyVGVtcGxhdGUgPSBgXG4gICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICR7IWVuYWJsZUFzeW5jID8gJ3Bvc3RNZXNzYWdlJyA6ICcnfSgoJHtyZXNvbHZlU3RyaW5nfSkoZS5kYXRhKSk7XG4gICAgICB9KTtcbiAgICBgO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbd2ViV29ya2VyVGVtcGxhdGVdLCB7IHR5cGU6ICd0ZXh0L2phdmFzY3JpcHQnIH0pO1xuICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVQcm9taXNlQ2xlYW5lcjxUPihwcm9taXNlOiBQcm9taXNlPFQ+KTogKGlucHV0OiBhbnkpID0+IFQge1xuICAgIHJldHVybiAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlUHJvbWlzZShwcm9taXNlKTtcbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVQcm9taXNlPFQ+KHByb21pc2U6IFByb21pc2U8VD4pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB3b3JrZXIgPSB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5nZXQocHJvbWlzZSk7XG4gICAgaWYgKHdvcmtlcikge1xuICAgICAgd29ya2VyLnRlcm1pbmF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLnByb21pc2VUb1dvcmtlck1hcC5kZWxldGUocHJvbWlzZSk7XG4gICAgcmV0dXJuIHByb21pc2U7XG4gIH1cbn1cbiJdfQ==