'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var directive_metadata_1 = require('./directive_metadata');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var async_1 = require('angular2/src/facade/async');
var xhr_1 = require('angular2/src/compiler/xhr');
var url_resolver_1 = require('angular2/src/compiler/url_resolver');
var style_url_resolver_1 = require('./style_url_resolver');
var di_1 = require('angular2/src/core/di');
var view_1 = require('angular2/src/core/metadata/view');
var html_ast_1 = require('./html_ast');
var html_parser_1 = require('./html_parser');
var template_preparser_1 = require('./template_preparser');
var TemplateNormalizer = (function () {
    function TemplateNormalizer(_xhr, _urlResolver, _htmlParser) {
        this._xhr = _xhr;
        this._urlResolver = _urlResolver;
        this._htmlParser = _htmlParser;
    }
    TemplateNormalizer.prototype.normalizeTemplate = function (directiveType, template) {
        var _this = this;
        if (lang_1.isPresent(template.template)) {
            return async_1.PromiseWrapper.resolve(this.normalizeLoadedTemplate(directiveType, template, template.template, directiveType.moduleUrl));
        }
        else if (lang_1.isPresent(template.templateUrl)) {
            var sourceAbsUrl = this._urlResolver.resolve(directiveType.moduleUrl, template.templateUrl);
            return this._xhr.get(sourceAbsUrl)
                .then(function (templateContent) { return _this.normalizeLoadedTemplate(directiveType, template, templateContent, sourceAbsUrl); });
        }
        else {
            throw new exceptions_1.BaseException("No template specified for component " + directiveType.name);
        }
    };
    TemplateNormalizer.prototype.normalizeLoadedTemplate = function (directiveType, templateMeta, template, templateAbsUrl) {
        var _this = this;
        var rootNodesAndErrors = this._htmlParser.parse(template, directiveType.name);
        if (rootNodesAndErrors.errors.length > 0) {
            var errorString = rootNodesAndErrors.errors.join('\n');
            throw new exceptions_1.BaseException("Template parse errors:\n" + errorString);
        }
        var visitor = new TemplatePreparseVisitor();
        html_ast_1.htmlVisitAll(visitor, rootNodesAndErrors.rootNodes);
        var allStyles = templateMeta.styles.concat(visitor.styles);
        var allStyleAbsUrls = visitor.styleUrls.filter(style_url_resolver_1.isStyleUrlResolvable)
            .map(function (url) { return _this._urlResolver.resolve(templateAbsUrl, url); })
            .concat(templateMeta.styleUrls.filter(style_url_resolver_1.isStyleUrlResolvable)
            .map(function (url) { return _this._urlResolver.resolve(directiveType.moduleUrl, url); }));
        var allResolvedStyles = allStyles.map(function (style) {
            var styleWithImports = style_url_resolver_1.extractStyleUrls(_this._urlResolver, templateAbsUrl, style);
            styleWithImports.styleUrls.forEach(function (styleUrl) { return allStyleAbsUrls.push(styleUrl); });
            return styleWithImports.style;
        });
        var encapsulation = templateMeta.encapsulation;
        if (encapsulation === view_1.ViewEncapsulation.Emulated && allResolvedStyles.length === 0 &&
            allStyleAbsUrls.length === 0) {
            encapsulation = view_1.ViewEncapsulation.None;
        }
        return new directive_metadata_1.CompileTemplateMetadata({
            encapsulation: encapsulation,
            template: template,
            templateUrl: templateAbsUrl,
            styles: allResolvedStyles,
            styleUrls: allStyleAbsUrls,
            ngContentSelectors: visitor.ngContentSelectors
        });
    };
    TemplateNormalizer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [xhr_1.XHR, url_resolver_1.UrlResolver, html_parser_1.HtmlParser])
    ], TemplateNormalizer);
    return TemplateNormalizer;
})();
exports.TemplateNormalizer = TemplateNormalizer;
var TemplatePreparseVisitor = (function () {
    function TemplatePreparseVisitor() {
        this.ngContentSelectors = [];
        this.styles = [];
        this.styleUrls = [];
        this.ngNonBindableStackCount = 0;
    }
    TemplatePreparseVisitor.prototype.visitElement = function (ast, context) {
        var preparsedElement = template_preparser_1.preparseElement(ast);
        switch (preparsedElement.type) {
            case template_preparser_1.PreparsedElementType.NG_CONTENT:
                if (this.ngNonBindableStackCount === 0) {
                    this.ngContentSelectors.push(preparsedElement.selectAttr);
                }
                break;
            case template_preparser_1.PreparsedElementType.STYLE:
                var textContent = '';
                ast.children.forEach(function (child) {
                    if (child instanceof html_ast_1.HtmlTextAst) {
                        textContent += child.value;
                    }
                });
                this.styles.push(textContent);
                break;
            case template_preparser_1.PreparsedElementType.STYLESHEET:
                this.styleUrls.push(preparsedElement.hrefAttr);
                break;
            default:
                // DDC reports this as error. See:
                // https://github.com/dart-lang/dev_compiler/issues/428
                break;
        }
        if (preparsedElement.nonBindable) {
            this.ngNonBindableStackCount++;
        }
        html_ast_1.htmlVisitAll(this, ast.children);
        if (preparsedElement.nonBindable) {
            this.ngNonBindableStackCount--;
        }
        return null;
    };
    TemplatePreparseVisitor.prototype.visitComment = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitAttr = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitText = function (ast, context) { return null; };
    return TemplatePreparseVisitor;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfbm9ybWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtWFFadEJuaEwudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci90ZW1wbGF0ZV9ub3JtYWxpemVyLnRzIl0sIm5hbWVzIjpbIlRlbXBsYXRlTm9ybWFsaXplciIsIlRlbXBsYXRlTm9ybWFsaXplci5jb25zdHJ1Y3RvciIsIlRlbXBsYXRlTm9ybWFsaXplci5ub3JtYWxpemVUZW1wbGF0ZSIsIlRlbXBsYXRlTm9ybWFsaXplci5ub3JtYWxpemVMb2FkZWRUZW1wbGF0ZSIsIlRlbXBsYXRlUHJlcGFyc2VWaXNpdG9yIiwiVGVtcGxhdGVQcmVwYXJzZVZpc2l0b3IuY29uc3RydWN0b3IiLCJUZW1wbGF0ZVByZXBhcnNlVmlzaXRvci52aXNpdEVsZW1lbnQiLCJUZW1wbGF0ZVByZXBhcnNlVmlzaXRvci52aXNpdENvbW1lbnQiLCJUZW1wbGF0ZVByZXBhcnNlVmlzaXRvci52aXNpdEF0dHIiLCJUZW1wbGF0ZVByZXBhcnNlVmlzaXRvci52aXNpdFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUlPLHNCQUFzQixDQUFDLENBQUE7QUFDOUIscUJBQWlDLDBCQUEwQixDQUFDLENBQUE7QUFDNUQsMkJBQTRCLGdDQUFnQyxDQUFDLENBQUE7QUFDN0Qsc0JBQTZCLDJCQUEyQixDQUFDLENBQUE7QUFFekQsb0JBQWtCLDJCQUEyQixDQUFDLENBQUE7QUFDOUMsNkJBQTBCLG9DQUFvQyxDQUFDLENBQUE7QUFDL0QsbUNBQXFELHNCQUFzQixDQUFDLENBQUE7QUFDNUUsbUJBQXlCLHNCQUFzQixDQUFDLENBQUE7QUFDaEQscUJBQWdDLGlDQUFpQyxDQUFDLENBQUE7QUFHbEUseUJBUU8sWUFBWSxDQUFDLENBQUE7QUFDcEIsNEJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLG1DQUFzRSxzQkFBc0IsQ0FBQyxD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QSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNyRUgsMkNBQVNBLEdBQVRBLFVBQVVBLEdBQWdCQSxFQUFFQSxPQUFZQSxJQUFTSSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUMvREosMkNBQVNBLEdBQVRBLFVBQVVBLEdBQWdCQSxFQUFFQSxPQUFZQSxJQUFTSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUNqRUwsOEJBQUNBO0FBQURBLENBQUNBLEFBM0NELElBMkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21waWxlVGVtcGxhdGVNZXRhZGF0YVxufSBmcm9tICcuL2RpcmVjdGl2ZV9tZXRhZGF0YSc7XG5pbXBvcnQge2lzUHJlc2VudCwgaXNCbGFua30gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7QmFzZUV4Y2VwdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9leGNlcHRpb25zJztcbmltcG9ydCB7UHJvbWlzZVdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvYXN5bmMnO1xuXG5pbXBvcnQge1hIUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvbXBpbGVyL3hocic7XG5pbXBvcnQge1VybFJlc29sdmVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29tcGlsZXIvdXJsX3Jlc29sdmVyJztcbmltcG9ydCB7ZXh0cmFjdFN0eWxlVXJscywgaXNTdHlsZVVybFJlc29sdmFibGV9IGZyb20gJy4vc3R5bGVfdXJsX3Jlc29sdmVyJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGEvdmlldyc7XG5cblxuaW1wb3J0IHtcbiAgSHRtbEFzdFZpc2l0b3IsXG4gIEh0bWxFbGVtZW50QXN0LFxuICBIdG1sVGV4dEFzdCxcbiAgSHRtbEF0dHJBc3QsXG4gIEh0bWxBc3QsXG4gIEh0bWxDb21tZW50QXN0LFxuICBodG1sVmlzaXRBbGxcbn0gZnJvbSAnLi9odG1sX2FzdCc7XG5pbXBvcnQge0h0bWxQYXJzZXJ9IGZyb20gJy4vaHRtbF9wYXJzZXInO1xuXG5pbXBvcnQge3ByZXBhcnNlRWxlbWVudCwgUHJlcGFyc2VkRWxlbWVudCwgUHJlcGFyc2VkRWxlbWVudFR5cGV9IGZyb20gJy4vdGVtcGxhdGVfcHJlcGFyc2VyJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRlbXBsYXRlTm9ybWFsaXplciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3hocjogWEhSLCBwcml2YXRlIF91cmxSZXNvbHZlcjogVXJsUmVzb2x2ZXIsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2h0bWxQYXJzZXI6IEh0bWxQYXJzZXIpIHt9XG5cbiAgbm9ybWFsaXplVGVtcGxhdGUoZGlyZWN0aXZlVHlwZTogQ29tcGlsZVR5cGVNZXRhZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IENvbXBpbGVUZW1wbGF0ZU1ldGFkYXRhKTogUHJvbWlzZTxDb21waWxlVGVtcGxhdGVNZXRhZGF0YT4ge1xuICAgIGlmIChpc1ByZXNlbnQodGVtcGxhdGUudGVtcGxhdGUpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZSh0aGlzLm5vcm1hbGl6ZUxvYWRlZFRlbXBsYXRlKFxuICAgICAgICAgIGRpcmVjdGl2ZVR5cGUsIHRlbXBsYXRlLCB0ZW1wbGF0ZS50ZW1wbGF0ZSwgZGlyZWN0aXZlVHlwZS5tb2R1bGVVcmwpKTtcbiAgICB9IGVsc2UgaWYgKGlzUHJlc2VudCh0ZW1wbGF0ZS50ZW1wbGF0ZVVybCkpIHtcbiAgICAgIHZhciBzb3VyY2VBYnNVcmwgPSB0aGlzLl91cmxSZXNvbHZlci5yZXNvbHZlKGRpcmVjdGl2ZVR5cGUubW9kdWxlVXJsLCB0ZW1wbGF0ZS50ZW1wbGF0ZVVybCk7XG4gICAgICByZXR1cm4gdGhpcy5feGhyLmdldChzb3VyY2VBYnNVcmwpXG4gICAgICAgICAgLnRoZW4odGVtcGxhdGVDb250ZW50ID0+IHRoaXMubm9ybWFsaXplTG9hZGVkVGVtcGxhdGUoZGlyZWN0aXZlVHlwZSwgdGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDb250ZW50LCBzb3VyY2VBYnNVcmwpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYE5vIHRlbXBsYXRlIHNwZWNpZmllZCBmb3IgY29tcG9uZW50ICR7ZGlyZWN0aXZlVHlwZS5uYW1lfWApO1xuICAgIH1cbiAgfVxuXG4gIG5vcm1hbGl6ZUxvYWRlZFRlbXBsYXRlKGRpcmVjdGl2ZVR5cGU6IENvbXBpbGVUeXBlTWV0YWRhdGEsIHRlbXBsYXRlTWV0YTogQ29tcGlsZVRlbXBsYXRlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBzdHJpbmcsIHRlbXBsYXRlQWJzVXJsOiBzdHJpbmcpOiBDb21waWxlVGVtcGxhdGVNZXRhZGF0YSB7XG4gICAgdmFyIHJvb3ROb2Rlc0FuZEVycm9ycyA9IHRoaXMuX2h0bWxQYXJzZXIucGFyc2UodGVtcGxhdGUsIGRpcmVjdGl2ZVR5cGUubmFtZSk7XG4gICAgaWYgKHJvb3ROb2Rlc0FuZEVycm9ycy5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGVycm9yU3RyaW5nID0gcm9vdE5vZGVzQW5kRXJyb3JzLmVycm9ycy5qb2luKCdcXG4nKTtcbiAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKGBUZW1wbGF0ZSBwYXJzZSBlcnJvcnM6XFxuJHtlcnJvclN0cmluZ31gKTtcbiAgICB9XG5cbiAgICB2YXIgdmlzaXRvciA9IG5ldyBUZW1wbGF0ZVByZXBhcnNlVmlzaXRvcigpO1xuICAgIGh0bWxWaXNpdEFsbCh2aXNpdG9yLCByb290Tm9kZXNBbmRFcnJvcnMucm9vdE5vZGVzKTtcbiAgICB2YXIgYWxsU3R5bGVzID0gdGVtcGxhdGVNZXRhLnN0eWxlcy5jb25jYXQodmlzaXRvci5zdHlsZXMpO1xuXG4gICAgdmFyIGFsbFN0eWxlQWJzVXJscyA9XG4gICAgICAgIHZpc2l0b3Iuc3R5bGVVcmxzLmZpbHRlcihpc1N0eWxlVXJsUmVzb2x2YWJsZSlcbiAgICAgICAgICAgIC5tYXAodXJsID0+IHRoaXMuX3VybFJlc29sdmVyLnJlc29sdmUodGVtcGxhdGVBYnNVcmwsIHVybCkpXG4gICAgICAgICAgICAuY29uY2F0KHRlbXBsYXRlTWV0YS5zdHlsZVVybHMuZmlsdGVyKGlzU3R5bGVVcmxSZXNvbHZhYmxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCh1cmwgPT4gdGhpcy5fdXJsUmVzb2x2ZXIucmVzb2x2ZShkaXJlY3RpdmVUeXBlLm1vZHVsZVVybCwgdXJsKSkpO1xuXG4gICAgdmFyIGFsbFJlc29sdmVkU3R5bGVzID0gYWxsU3R5bGVzLm1hcChzdHlsZSA9PiB7XG4gICAgICB2YXIgc3R5bGVXaXRoSW1wb3J0cyA9IGV4dHJhY3RTdHlsZVVybHModGhpcy5fdXJsUmVzb2x2ZXIsIHRlbXBsYXRlQWJzVXJsLCBzdHlsZSk7XG4gICAgICBzdHlsZVdpdGhJbXBvcnRzLnN0eWxlVXJscy5mb3JFYWNoKHN0eWxlVXJsID0+IGFsbFN0eWxlQWJzVXJscy5wdXNoKHN0eWxlVXJsKSk7XG4gICAgICByZXR1cm4gc3R5bGVXaXRoSW1wb3J0cy5zdHlsZTtcbiAgICB9KTtcblxuICAgIHZhciBlbmNhcHN1bGF0aW9uID0gdGVtcGxhdGVNZXRhLmVuY2Fwc3VsYXRpb247XG4gICAgaWYgKGVuY2Fwc3VsYXRpb24gPT09IFZpZXdFbmNhcHN1bGF0aW9uLkVtdWxhdGVkICYmIGFsbFJlc29sdmVkU3R5bGVzLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICBhbGxTdHlsZUFic1VybHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBlbmNhcHN1bGF0aW9uID0gVmlld0VuY2Fwc3VsYXRpb24uTm9uZTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBDb21waWxlVGVtcGxhdGVNZXRhZGF0YSh7XG4gICAgICBlbmNhcHN1bGF0aW9uOiBlbmNhcHN1bGF0aW9uLFxuICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxuICAgICAgdGVtcGxhdGVVcmw6IHRlbXBsYXRlQWJzVXJsLFxuICAgICAgc3R5bGVzOiBhbGxSZXNvbHZlZFN0eWxlcyxcbiAgICAgIHN0eWxlVXJsczogYWxsU3R5bGVBYnNVcmxzLFxuICAgICAgbmdDb250ZW50U2VsZWN0b3JzOiB2aXNpdG9yLm5nQ29udGVudFNlbGVjdG9yc1xuICAgIH0pO1xuICB9XG59XG5cbmNsYXNzIFRlbXBsYXRlUHJlcGFyc2VWaXNpdG9yIGltcGxlbWVudHMgSHRtbEFzdFZpc2l0b3Ige1xuICBuZ0NvbnRlbnRTZWxlY3RvcnM6IHN0cmluZ1tdID0gW107XG4gIHN0eWxlczogc3RyaW5nW10gPSBbXTtcbiAgc3R5bGVVcmxzOiBzdHJpbmdbXSA9IFtdO1xuICBuZ05vbkJpbmRhYmxlU3RhY2tDb3VudDogbnVtYmVyID0gMDtcblxuICB2aXNpdEVsZW1lbnQoYXN0OiBIdG1sRWxlbWVudEFzdCwgY29udGV4dDogYW55KTogYW55IHtcbiAgICB2YXIgcHJlcGFyc2VkRWxlbWVudCA9IHByZXBhcnNlRWxlbWVudChhc3QpO1xuICAgIHN3aXRjaCAocHJlcGFyc2VkRWxlbWVudC50eXBlKSB7XG4gICAgICBjYXNlIFByZXBhcnNlZEVsZW1lbnRUeXBlLk5HX0NPTlRFTlQ6XG4gICAgICAgIGlmICh0aGlzLm5nTm9uQmluZGFibGVTdGFja0NvdW50ID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5uZ0NvbnRlbnRTZWxlY3RvcnMucHVzaChwcmVwYXJzZWRFbGVtZW50LnNlbGVjdEF0dHIpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRTpcbiAgICAgICAgdmFyIHRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIGFzdC5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBIdG1sVGV4dEFzdCkge1xuICAgICAgICAgICAgdGV4dENvbnRlbnQgKz0gKDxIdG1sVGV4dEFzdD5jaGlsZCkudmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdHlsZXMucHVzaCh0ZXh0Q29udGVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQcmVwYXJzZWRFbGVtZW50VHlwZS5TVFlMRVNIRUVUOlxuICAgICAgICB0aGlzLnN0eWxlVXJscy5wdXNoKHByZXBhcnNlZEVsZW1lbnQuaHJlZkF0dHIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIEREQyByZXBvcnRzIHRoaXMgYXMgZXJyb3IuIFNlZTpcbiAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2RhcnQtbGFuZy9kZXZfY29tcGlsZXIvaXNzdWVzLzQyOFxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHByZXBhcnNlZEVsZW1lbnQubm9uQmluZGFibGUpIHtcbiAgICAgIHRoaXMubmdOb25CaW5kYWJsZVN0YWNrQ291bnQrKztcbiAgICB9XG4gICAgaHRtbFZpc2l0QWxsKHRoaXMsIGFzdC5jaGlsZHJlbik7XG4gICAgaWYgKHByZXBhcnNlZEVsZW1lbnQubm9uQmluZGFibGUpIHtcbiAgICAgIHRoaXMubmdOb25CaW5kYWJsZVN0YWNrQ291bnQtLTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmlzaXRDb21tZW50KGFzdDogSHRtbENvbW1lbnRBc3QsIGNvbnRleHQ6IGFueSk6IGFueSB7IHJldHVybiBudWxsOyB9XG4gIHZpc2l0QXR0cihhc3Q6IEh0bWxBdHRyQXN0LCBjb250ZXh0OiBhbnkpOiBhbnkgeyByZXR1cm4gbnVsbDsgfVxuICB2aXNpdFRleHQoYXN0OiBIdG1sVGV4dEFzdCwgY29udGV4dDogYW55KTogYW55IHsgcmV0dXJuIG51bGw7IH1cbn1cbiJdfQ==