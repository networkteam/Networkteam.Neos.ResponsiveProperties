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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSelectBoxOptions = exports.searchOptions = exports.shouldDisplaySearchBox = void 0;
var shouldDisplaySearchBox = function (options, processedSelectBoxOptions) {
    return typeof options.minimumResultsForSearch !== "undefined" &&
        options.minimumResultsForSearch >= 0 &&
        processedSelectBoxOptions.length >= options.minimumResultsForSearch;
};
exports.shouldDisplaySearchBox = shouldDisplaySearchBox;
var searchOptions = function (searchTerm, processedSelectBoxOptions) {
    return processedSelectBoxOptions.filter(function (option) { return option.label && option.label.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1; });
};
exports.searchOptions = searchOptions;
var processSelectBoxOptions = function (i18nRegistry, selectBoxOptions) {
    return Object.keys(selectBoxOptions).reduce(function (options, currentOptionKey) {
        var currentOption = selectBoxOptions[currentOptionKey];
        if (!currentOption || !currentOption.label) {
            return options;
        }
        return __spreadArray(__spreadArray([], __read(options)), [
            __assign(__assign({ value: currentOptionKey }, currentOption), { label: i18nRegistry.translate(currentOption.label) }),
        ]);
    }, []);
};
exports.processSelectBoxOptions = processSelectBoxOptions;
//# sourceMappingURL=SelectBoxHelpers.js.map