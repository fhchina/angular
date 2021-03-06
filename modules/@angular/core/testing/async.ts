/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', async(inject([AClass], (object) => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   })
 * });
 * ```
 */
export function async(fn: Function): Function {
  return () => new Promise<void>((finishCallback, failCallback) => {
           var AsyncTestZoneSpec = (Zone as any /** TODO #9100 */)['AsyncTestZoneSpec'];
           if (AsyncTestZoneSpec === undefined) {
             throw new Error(
                 'AsyncTestZoneSpec is needed for the async() test helper but could not be found. ' +
                 'Please make sure that your environment includes zone.js/dist/async-test.js');
           }
           var testZoneSpec = new AsyncTestZoneSpec(finishCallback, failCallback, 'test');
           var testZone = Zone.current.fork(testZoneSpec);
           return testZone.run(fn);
         });
}
