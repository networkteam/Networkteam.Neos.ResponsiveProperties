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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var SimpleSelectBoxEditor_1 = __importDefault(require("./SimpleSelectBoxEditor"));
var react_ui_components_1 = require("@neos-project/react-ui-components");
var Editor = function (props) {
    var currentValues = props.value, i18n = props.i18nRegistry;
    var handleValueChange = function (propertyName) {
        return function (value) {
            var _a;
            var newProperties = __assign(__assign({}, currentValues), (_a = {}, _a[propertyName] = value, _a));
            props.commit(newProperties);
        };
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, Object.keys(props.options.properties).map(function (propertyName) {
        var _a = props.options.properties[propertyName], label = _a.label, icon = _a.icon, values = _a.values;
        var selectOptions = __assign(__assign({}, props.options), { values: values && Object.keys(values).length ? values : props.options.values });
        return (react_1.default.createElement("div", { key: "select-box-" + propertyName },
            react_1.default.createElement("div", { style: { display: "flex", alignItems: "center" } },
                icon && react_1.default.createElement(react_ui_components_1.Icon, { icon: icon, style: { marginRight: 10 } }),
                react_1.default.createElement(react_ui_components_1.Label, { style: { width: "100%" } }, i18n.translate(label))),
            react_1.default.createElement(SimpleSelectBoxEditor_1.default, { value: currentValues[propertyName], commit: handleValueChange(propertyName), options: selectOptions, i18nRegistry: i18n })));
    })));
};
exports.default = Editor;
//# sourceMappingURL=index.js.map