"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = void 0;
var generatePassword = {
    _pattern: /[a-zA-Z0-9_\-\+\.]/,
    generate: function (length) {
        var _this = this;
        return Array.apply(null, [{ length: length }])
            .map(function () {
            var result;
            while (true) {
                result = String.fromCharCode(Math.floor(Math.random() * 256));
                if (_this._pattern.test(result)) {
                    return result;
                }
            }
        }, this)
            .join('');
    },
};
exports.generatePassword = generatePassword;
