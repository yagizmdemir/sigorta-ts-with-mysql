"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.musteriService = void 0;
var connect_1 = require("../../utils/connect");
var response_1 = require("../../utils/response");
var musteriService = /** @class */ (function () {
    function musteriService() {
    }
    musteriService.prototype.addMusteri = function (res, table, values) {
        return __awaiter(this, void 0, void 0, function () {
            var text, operation;
            return __generator(this, function (_a) {
                text = "INSERT INTO ".concat(table, " SET ?");
                operation = connect_1.mySqlConnection.query(text, values, function (err, result) {
                    if (err != null) {
                        return new response_1.ResponseService(null, 'Something went wrong').error400(res);
                    }
                    if (result) {
                        return new response_1.ResponseService(result, 'Success').created(res);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    // Müşteriyi temsilci ve ajans idsine göre de çekebilmemiz gerek
    musteriService.prototype.getAllMusteri = function (req, res, table) {
        return __awaiter(this, void 0, void 0, function () {
            var text, operation;
            return __generator(this, function (_a) {
                text = "SELECT * FROM ".concat(table);
                operation = connect_1.mySqlConnection.query(text, function (err, result) {
                    if (err != null)
                        return new response_1.ResponseService(null, 'Something went wrong').error400(res);
                    if (!result.length)
                        return new response_1.ResponseService(null, '404 not found!').error404(res);
                    if (result)
                        return new response_1.ResponseService(result, 'Success').success(res);
                });
                return [2 /*return*/];
            });
        });
    };
    musteriService.prototype.getMusteri = function (req, res, table, where, search) {
        return __awaiter(this, void 0, void 0, function () {
            var text, operation;
            return __generator(this, function (_a) {
                text = "SELECT * FROM ".concat(table, " WHERE ").concat(where, " = ?");
                operation = connect_1.mySqlConnection.query(text, search, function (err, result) {
                    if (err != null)
                        return new response_1.ResponseService(null, 'Something went wrong').error400(res);
                    if (!result.length)
                        return new response_1.ResponseService(null, '404 not found!').error404(res);
                    if (result)
                        return new response_1.ResponseService(result, 'Success').success(res);
                });
                return [2 /*return*/];
            });
        });
    };
    musteriService.prototype.deleteMusteri = function (req, res, table, values, where) {
        return __awaiter(this, void 0, void 0, function () {
            var text, operation;
            return __generator(this, function (_a) {
                text = "DELETE FROM ".concat(table, " WHERE ").concat(where, " = \"").concat(values, "\"");
                operation = connect_1.mySqlConnection.query(text, values, function (err, result) {
                    if (err != null)
                        return new response_1.ResponseService(null, 'Something went wrong').error400(res);
                    if (result) {
                        return new response_1.ResponseService(result, 'Success').success(res);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    musteriService.prototype.updateMusteri = function (req, res) {
        throw new Error('Method not implemented.');
    };
    return musteriService;
}());
exports.musteriService = musteriService;
// middlewareda istek atan kullanıcının ajans_id ve id si alınacak ve ona göre çekilecek.
