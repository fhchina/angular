export { AngularEntrypoint } from 'angular2/src/core/angular_entrypoint';
export { BROWSER_PROVIDERS, ELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS_PROD_MODE, inspectNativeElement, BrowserDomAdapter, By, Title, enableDebugTools, disableDebugTools } from 'angular2/src/platform/browser_common';
import { isPresent } from 'angular2/src/facade/lang';
import { BROWSER_PROVIDERS, BROWSER_APP_COMMON_PROVIDERS } from 'angular2/src/platform/browser_common';
import { platform } from 'angular2/core';
/**
 * An array of providers that should be passed into `application()` when bootstrapping a component
 * when all templates
 * have been precompiled offline.
 */
export const BROWSER_APP_PROVIDERS = BROWSER_APP_COMMON_PROVIDERS;
/**
 * See {@link bootstrap} for more information.
 */
export function bootstrapStatic(appComponentType, customProviders, initReflector) {
    if (isPresent(initReflector)) {
        initReflector();
    }
    let appProviders = isPresent(customProviders) ? [BROWSER_APP_PROVIDERS, customProviders] : BROWSER_APP_PROVIDERS;
    return platform(BROWSER_PROVIDERS).application(appProviders).bootstrap(appComponentType);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9zdGF0aWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLW1NUEVSUWNGLnRtcC9hbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyX3N0YXRpYy50cyJdLCJuYW1lcyI6WyJib290c3RyYXBTdGF0aWMiXSwibWFwcGluZ3MiOiJBQUFBLFNBQVEsaUJBQWlCLFFBQU8sc0NBQXNDLENBQUM7QUFDdkUsU0FDRSxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLGlDQUFpQyxFQUNqQyxvQkFBb0IsRUFDcEIsaUJBQWlCLEVBQ2pCLEVBQUUsRUFDRixLQUFLLEVBQ0wsZ0JBQWdCLEVBQ2hCLGlCQUFpQixRQUNaLHNDQUFzQyxDQUFDO09BRXZDLEVBQU8sU0FBUyxFQUFDLE1BQU0sMEJBQTBCO09BQ2pELEVBQ0wsaUJBQWlCLEVBQ2pCLDRCQUE0QixFQUM3QixNQUFNLHNDQUFzQztPQUN0QyxFQUFlLFFBQVEsRUFBQyxNQUFNLGVBQWU7QUFFcEQ7Ozs7R0FJRztBQUNILGFBQWEscUJBQXFCLEdBQzlCLDRCQUE0QixDQUFDO0FBRWpDOztHQUVHO0FBQ0gsZ0NBQWdDLGdCQUFzQixFQUN0QixlQUF3RCxFQUN4RCxhQUF3QjtJQUN0REEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDN0JBLGFBQWFBLEVBQUVBLENBQUNBO0lBQ2xCQSxDQUFDQTtJQUVEQSxJQUFJQSxZQUFZQSxHQUNaQSxTQUFTQSxDQUFDQSxlQUFlQSxDQUFDQSxHQUFHQSxDQUFDQSxxQkFBcUJBLEVBQUVBLGVBQWVBLENBQUNBLEdBQUdBLHFCQUFxQkEsQ0FBQ0E7SUFDbEdBLE1BQU1BLENBQUNBLFFBQVFBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtBQUMzRkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge0FuZ3VsYXJFbnRyeXBvaW50fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9hbmd1bGFyX2VudHJ5cG9pbnQnO1xuZXhwb3J0IHtcbiAgQlJPV1NFUl9QUk9WSURFUlMsXG4gIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTLFxuICBFTEVNRU5UX1BST0JFX1BST1ZJREVSU19QUk9EX01PREUsXG4gIGluc3BlY3ROYXRpdmVFbGVtZW50LFxuICBCcm93c2VyRG9tQWRhcHRlcixcbiAgQnksXG4gIFRpdGxlLFxuICBlbmFibGVEZWJ1Z1Rvb2xzLFxuICBkaXNhYmxlRGVidWdUb29sc1xufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlcl9jb21tb24nO1xuXG5pbXBvcnQge1R5cGUsIGlzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7XG4gIEJST1dTRVJfUFJPVklERVJTLFxuICBCUk9XU0VSX0FQUF9DT01NT05fUFJPVklERVJTXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyX2NvbW1vbic7XG5pbXBvcnQge0NvbXBvbmVudFJlZiwgcGxhdGZvcm19IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xuXG4vKipcbiAqIEFuIGFycmF5IG9mIHByb3ZpZGVycyB0aGF0IHNob3VsZCBiZSBwYXNzZWQgaW50byBgYXBwbGljYXRpb24oKWAgd2hlbiBib290c3RyYXBwaW5nIGEgY29tcG9uZW50XG4gKiB3aGVuIGFsbCB0ZW1wbGF0ZXNcbiAqIGhhdmUgYmVlbiBwcmVjb21waWxlZCBvZmZsaW5lLlxuICovXG5leHBvcnQgY29uc3QgQlJPV1NFUl9BUFBfUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSUztcblxuLyoqXG4gKiBTZWUge0BsaW5rIGJvb3RzdHJhcH0gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBib290c3RyYXBTdGF0aWMoYXBwQ29tcG9uZW50VHlwZTogVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUHJvdmlkZXJzPzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRSZWZsZWN0b3I/OiBGdW5jdGlvbik6IFByb21pc2U8Q29tcG9uZW50UmVmPiB7XG4gIGlmIChpc1ByZXNlbnQoaW5pdFJlZmxlY3RvcikpIHtcbiAgICBpbml0UmVmbGVjdG9yKCk7XG4gIH1cblxuICBsZXQgYXBwUHJvdmlkZXJzID1cbiAgICAgIGlzUHJlc2VudChjdXN0b21Qcm92aWRlcnMpID8gW0JST1dTRVJfQVBQX1BST1ZJREVSUywgY3VzdG9tUHJvdmlkZXJzXSA6IEJST1dTRVJfQVBQX1BST1ZJREVSUztcbiAgcmV0dXJuIHBsYXRmb3JtKEJST1dTRVJfUFJPVklERVJTKS5hcHBsaWNhdGlvbihhcHBQcm92aWRlcnMpLmJvb3RzdHJhcChhcHBDb21wb25lbnRUeXBlKTtcbn1cbiJdfQ==