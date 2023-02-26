"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
var ResponseService = /** @class */ (function () {
    function ResponseService(data, message, limit, page) {
        this.data = data;
        this.message = message;
        this.limit = limit;
        this.page = page;
    }
    ResponseService.prototype.success = function (res) {
        var _a;
        return res.status(200).json({
            status: 200,
            success: true,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : 'Success',
            data: this.data,
        });
    };
    ResponseService.prototype.list = function (res) {
        var _a;
        return res.status(200).json({
            status: 200,
            success: true,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : 'Success',
            pageLimit: this.limit,
            page: this.page,
            data: this.data,
        });
    };
    ResponseService.prototype.created = function (res) {
        var _a;
        return res.status(201).json({
            status: 201,
            success: true,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : 'Success',
            data: this.data,
        });
    };
    ResponseService.prototype.error500 = function (res) {
        return res.status(500).json({
            status: 500,
            success: false,
            message: 'Server internal error',
        });
    };
    ResponseService.prototype.error400 = function (res) {
        var _a;
        return res.status(400).json({
            status: 400,
            success: false,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : 'Something went wrong',
        });
    };
    ResponseService.prototype.error401 = function (res) {
        var _a;
        return res.status(401).json({
            status: 401,
            success: false,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : '401 Unauthorized',
        });
    };
    ResponseService.prototype.error404 = function (res) {
        var _a;
        return res.status(404).json({
            status: 404,
            success: false,
            message: (_a = this.message) !== null && _a !== void 0 ? _a : '404 not found',
        });
    };
    ResponseService.prototype.error429 = function (res) {
        return res.status(429).json({
            status: 429,
            success: false,
            message: 'Request limit exceeded',
        });
    };
    return ResponseService;
}());
exports.ResponseService = ResponseService;
