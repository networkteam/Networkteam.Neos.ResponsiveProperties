"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_ui_components_1 = require("@neos-project/react-ui-components");
var SelectBoxHelpers_1 = require("./SelectBoxHelpers");
var SimpleSelectBox = function (_a) {
    var commit = _a.commit, value = _a.value, className = _a.className, options = _a.options, i18nRegistry = _a.i18nRegistry;
    var _b = __read(react_1.useState(""), 2), searchTerm = _b[0], setSearchTerm = _b[1];
    var defaultOptions = { minimumResultsForSearch: 5, threshold: 0, disabled: false };
    var mergedOptions = __assign(__assign({}, defaultOptions), options);
    var processedSelectBoxOptions = SelectBoxHelpers_1.processSelectBoxOptions(i18nRegistry, mergedOptions.values);
    var allowEmpty = options.allowEmpty || Object.prototype.hasOwnProperty.call(options.values, "");
    var placeholder = (options && options.placeholder && i18nRegistry.translate(unescape(options.placeholder))) ||
        i18nRegistry.translate("Neos.Neos:Main:choose");
    if (options.multiple) {
        return (react_1.default.createElement(react_ui_components_1.MultiSelectBox, { className: className, options: processedSelectBoxOptions, values: value || [], onValuesChange: commit, placeholder: placeholder, allowEmpty: allowEmpty, displaySearchBox: SelectBoxHelpers_1.shouldDisplaySearchBox(mergedOptions, processedSelectBoxOptions), searchOptions: SelectBoxHelpers_1.searchOptions(searchTerm, processedSelectBoxOptions), onSearchTermChange: setSearchTerm, noMatchesFoundLabel: i18nRegistry.translate("Neos.Neos:Main:noMatchesFound"), searchBoxLeftToTypeLabel: i18nRegistry.translate("Neos.Neos:Main:searchBoxLeftToType"), threshold: mergedOptions.threshold, disabled: mergedOptions.disabled }));
    }
    return (react_1.default.createElement(react_ui_components_1.SelectBox, { options: searchTerm ? SelectBoxHelpers_1.searchOptions(searchTerm, processedSelectBoxOptions) : processedSelectBoxOptions, value: value, className: className, onValueChange: commit, placeholder: placeholder, allowEmpty: allowEmpty, displaySearchBox: SelectBoxHelpers_1.shouldDisplaySearchBox(mergedOptions, processedSelectBoxOptions), onSearchTermChange: setSearchTerm, noMatchesFoundLabel: i18nRegistry.translate("Neos.Neos:Main:noMatchesFound"), searchBoxLeftToTypeLabel: i18nRegistry.translate("Neos.Neos:Main:searchBoxLeftToType"), threshold: mergedOptions.threshold, disabled: mergedOptions.disabled }));
};
exports.default = SimpleSelectBox;
//# sourceMappingURL=SimpleSelectBoxEditor.js.map