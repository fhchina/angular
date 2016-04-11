import { CONST_EXPR } from 'angular2/src/facade/lang';
import { Provider } from 'angular2/src/core/di';
import { APP_ID_RANDOM_PROVIDER } from './application_tokens';
import { IterableDiffers, defaultIterableDiffers, KeyValueDiffers, defaultKeyValueDiffers } from './change_detection/change_detection';
import { ResolvedMetadataCache } from 'angular2/src/core/linker/resolved_metadata_cache';
import { AppViewManager } from './linker/view_manager';
import { AppViewManager_ } from "./linker/view_manager";
import { ViewResolver } from './linker/view_resolver';
import { DirectiveResolver } from './linker/directive_resolver';
import { PipeResolver } from './linker/pipe_resolver';
import { Compiler } from './linker/compiler';
import { Compiler_ } from "./linker/compiler";
import { DynamicComponentLoader } from './linker/dynamic_component_loader';
import { DynamicComponentLoader_ } from "./linker/dynamic_component_loader";
/**
 * A default set of providers which should be included in any Angular
 * application, regardless of the platform it runs onto.
 */
export const APPLICATION_COMMON_PROVIDERS = CONST_EXPR([
    new Provider(Compiler, { useClass: Compiler_ }),
    APP_ID_RANDOM_PROVIDER,
    ResolvedMetadataCache,
    new Provider(AppViewManager, { useClass: AppViewManager_ }),
    ViewResolver,
    new Provider(IterableDiffers, { useValue: defaultIterableDiffers }),
    new Provider(KeyValueDiffers, { useValue: defaultKeyValueDiffers }),
    DirectiveResolver,
    PipeResolver,
    new Provider(DynamicComponentLoader, { useClass: DynamicComponentLoader_ })
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fY29tbW9uX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtbU1QRVJRY0YudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2FwcGxpY2F0aW9uX2NvbW1vbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBTyxVQUFVLEVBQUMsTUFBTSwwQkFBMEI7T0FDbEQsRUFBVSxRQUFRLEVBQXdCLE1BQU0sc0JBQXNCO09BQ3RFLEVBR0wsc0JBQXNCLEVBQ3ZCLE1BQU0sc0JBQXNCO09BQ3RCLEVBQ0wsZUFBZSxFQUNmLHNCQUFzQixFQUN0QixlQUFlLEVBQ2Ysc0JBQXNCLEVBQ3ZCLE1BQU0scUNBQXFDO09BQ3JDLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxrREFBa0Q7T0FDL0UsRUFBQyxjQUFjLEVBQUMsTUFBTSx1QkFBdUI7T0FDN0MsRUFBQyxlQUFlLEVBQUMsTUFBTSx1QkFBdUI7T0FDOUMsRUFBQyxZQUFZLEVBQUMsTUFBTSx3QkFBd0I7T0FDNUMsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLDZCQUE2QjtPQUN0RCxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QjtPQUM1QyxFQUFDLFFBQVEsRUFBQyxNQUFNLG1CQUFtQjtPQUNuQyxFQUFDLFNBQVMsRUFBQyxNQUFNLG1CQUFtQjtPQUNwQyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sbUNBQW1DO09BQ2pFLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSxtQ0FBbUM7QUFFekU7OztHQUdHO0FBQ0gsYUFBYSw0QkFBNEIsR0FBbUMsVUFBVSxDQUFDO0lBQ3JGLElBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQztJQUM3QyxzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLElBQUksUUFBUSxDQUFDLGNBQWMsRUFBRSxFQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUMsQ0FBQztJQUN6RCxZQUFZO0lBQ1osSUFBSSxRQUFRLENBQUMsZUFBZSxFQUFFLEVBQUMsUUFBUSxFQUFFLHNCQUFzQixFQUFDLENBQUM7SUFDakUsSUFBSSxRQUFRLENBQUMsZUFBZSxFQUFFLEVBQUMsUUFBUSxFQUFFLHNCQUFzQixFQUFDLENBQUM7SUFDakUsaUJBQWlCO0lBQ2pCLFlBQVk7SUFDWixJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxFQUFDLFFBQVEsRUFBRSx1QkFBdUIsRUFBQyxDQUFDO0NBQzFFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7VHlwZSwgQ09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXIsIEluamVjdG9yLCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtcbiAgQVBQX0NPTVBPTkVOVF9SRUZfUFJPTUlTRSxcbiAgQVBQX0NPTVBPTkVOVCxcbiAgQVBQX0lEX1JBTkRPTV9QUk9WSURFUlxufSBmcm9tICcuL2FwcGxpY2F0aW9uX3Rva2Vucyc7XG5pbXBvcnQge1xuICBJdGVyYWJsZURpZmZlcnMsXG4gIGRlZmF1bHRJdGVyYWJsZURpZmZlcnMsXG4gIEtleVZhbHVlRGlmZmVycyxcbiAgZGVmYXVsdEtleVZhbHVlRGlmZmVyc1xufSBmcm9tICcuL2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge1Jlc29sdmVkTWV0YWRhdGFDYWNoZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL3Jlc29sdmVkX21ldGFkYXRhX2NhY2hlJztcbmltcG9ydCB7QXBwVmlld01hbmFnZXJ9IGZyb20gJy4vbGlua2VyL3ZpZXdfbWFuYWdlcic7XG5pbXBvcnQge0FwcFZpZXdNYW5hZ2VyX30gZnJvbSBcIi4vbGlua2VyL3ZpZXdfbWFuYWdlclwiO1xuaW1wb3J0IHtWaWV3UmVzb2x2ZXJ9IGZyb20gJy4vbGlua2VyL3ZpZXdfcmVzb2x2ZXInO1xuaW1wb3J0IHtEaXJlY3RpdmVSZXNvbHZlcn0gZnJvbSAnLi9saW5rZXIvZGlyZWN0aXZlX3Jlc29sdmVyJztcbmltcG9ydCB7UGlwZVJlc29sdmVyfSBmcm9tICcuL2xpbmtlci9waXBlX3Jlc29sdmVyJztcbmltcG9ydCB7Q29tcGlsZXJ9IGZyb20gJy4vbGlua2VyL2NvbXBpbGVyJztcbmltcG9ydCB7Q29tcGlsZXJffSBmcm9tIFwiLi9saW5rZXIvY29tcGlsZXJcIjtcbmltcG9ydCB7RHluYW1pY0NvbXBvbmVudExvYWRlcn0gZnJvbSAnLi9saW5rZXIvZHluYW1pY19jb21wb25lbnRfbG9hZGVyJztcbmltcG9ydCB7RHluYW1pY0NvbXBvbmVudExvYWRlcl99IGZyb20gXCIuL2xpbmtlci9keW5hbWljX2NvbXBvbmVudF9sb2FkZXJcIjtcblxuLyoqXG4gKiBBIGRlZmF1bHQgc2V0IG9mIHByb3ZpZGVycyB3aGljaCBzaG91bGQgYmUgaW5jbHVkZWQgaW4gYW55IEFuZ3VsYXJcbiAqIGFwcGxpY2F0aW9uLCByZWdhcmRsZXNzIG9mIHRoZSBwbGF0Zm9ybSBpdCBydW5zIG9udG8uXG4gKi9cbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTOiBBcnJheTxUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXT4gPSBDT05TVF9FWFBSKFtcbiAgbmV3IFByb3ZpZGVyKENvbXBpbGVyLCB7dXNlQ2xhc3M6IENvbXBpbGVyX30pLFxuICBBUFBfSURfUkFORE9NX1BST1ZJREVSLFxuICBSZXNvbHZlZE1ldGFkYXRhQ2FjaGUsXG4gIG5ldyBQcm92aWRlcihBcHBWaWV3TWFuYWdlciwge3VzZUNsYXNzOiBBcHBWaWV3TWFuYWdlcl99KSxcbiAgVmlld1Jlc29sdmVyLFxuICBuZXcgUHJvdmlkZXIoSXRlcmFibGVEaWZmZXJzLCB7dXNlVmFsdWU6IGRlZmF1bHRJdGVyYWJsZURpZmZlcnN9KSxcbiAgbmV3IFByb3ZpZGVyKEtleVZhbHVlRGlmZmVycywge3VzZVZhbHVlOiBkZWZhdWx0S2V5VmFsdWVEaWZmZXJzfSksXG4gIERpcmVjdGl2ZVJlc29sdmVyLFxuICBQaXBlUmVzb2x2ZXIsXG4gIG5ldyBQcm92aWRlcihEeW5hbWljQ29tcG9uZW50TG9hZGVyLCB7dXNlQ2xhc3M6IER5bmFtaWNDb21wb25lbnRMb2FkZXJffSlcbl0pOyJdfQ==