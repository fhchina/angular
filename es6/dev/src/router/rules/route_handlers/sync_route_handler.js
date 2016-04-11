import { PromiseWrapper } from 'angular2/src/facade/async';
import { isPresent } from 'angular2/src/facade/lang';
import { RouteData, BLANK_ROUTE_DATA } from '../../instruction';
export class SyncRouteHandler {
    constructor(componentType, data) {
        this.componentType = componentType;
        /** @internal */
        this._resolvedComponent = null;
        this._resolvedComponent = PromiseWrapper.resolve(componentType);
        this.data = isPresent(data) ? new RouteData(data) : BLANK_ROUTE_DATA;
    }
    resolveComponentType() { return this._resolvedComponent; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY19yb3V0ZV9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1tTVBFUlFjRi50bXAvYW5ndWxhcjIvc3JjL3JvdXRlci9ydWxlcy9yb3V0ZV9oYW5kbGVycy9zeW5jX3JvdXRlX2hhbmRsZXIudHMiXSwibmFtZXMiOlsiU3luY1JvdXRlSGFuZGxlciIsIlN5bmNSb3V0ZUhhbmRsZXIuY29uc3RydWN0b3IiLCJTeW5jUm91dGVIYW5kbGVyLnJlc29sdmVDb21wb25lbnRUeXBlIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDJCQUEyQjtPQUNqRCxFQUFDLFNBQVMsRUFBTyxNQUFNLDBCQUEwQjtPQUdqRCxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLG1CQUFtQjtBQUc3RDtJQU1FQSxZQUFtQkEsYUFBbUJBLEVBQUVBLElBQTJCQTtRQUFoREMsa0JBQWFBLEdBQWJBLGFBQWFBLENBQU1BO1FBSHRDQSxnQkFBZ0JBO1FBQ2hCQSx1QkFBa0JBLEdBQWlCQSxJQUFJQSxDQUFDQTtRQUd0Q0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxjQUFjQSxDQUFDQSxPQUFPQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNoRUEsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsSUFBSUEsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsZ0JBQWdCQSxDQUFDQTtJQUN2RUEsQ0FBQ0E7SUFFREQsb0JBQW9CQSxLQUFtQkUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxDQUFDQTtBQUMxRUYsQ0FBQ0E7QUFBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuaW1wb3J0IHtpc1ByZXNlbnQsIFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCB7Um91dGVIYW5kbGVyfSBmcm9tICcuL3JvdXRlX2hhbmRsZXInO1xuaW1wb3J0IHtSb3V0ZURhdGEsIEJMQU5LX1JPVVRFX0RBVEF9IGZyb20gJy4uLy4uL2luc3RydWN0aW9uJztcblxuXG5leHBvcnQgY2xhc3MgU3luY1JvdXRlSGFuZGxlciBpbXBsZW1lbnRzIFJvdXRlSGFuZGxlciB7XG4gIHB1YmxpYyBkYXRhOiBSb3V0ZURhdGE7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVzb2x2ZWRDb21wb25lbnQ6IFByb21pc2U8YW55PiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudFR5cGU6IFR5cGUsIGRhdGE/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIHRoaXMuX3Jlc29sdmVkQ29tcG9uZW50ID0gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShjb21wb25lbnRUeXBlKTtcbiAgICB0aGlzLmRhdGEgPSBpc1ByZXNlbnQoZGF0YSkgPyBuZXcgUm91dGVEYXRhKGRhdGEpIDogQkxBTktfUk9VVEVfREFUQTtcbiAgfVxuXG4gIHJlc29sdmVDb21wb25lbnRUeXBlKCk6IFByb21pc2U8YW55PiB7IHJldHVybiB0aGlzLl9yZXNvbHZlZENvbXBvbmVudDsgfVxufVxuIl19