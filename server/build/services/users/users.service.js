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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var connect_1 = require("../../utils/connect");
var response_1 = require("../../utils/response");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var crypto_1 = __importDefault(require("crypto"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getUsers = function (req, res, table) {
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
    UserService.prototype.getUser = function (req, res, table, where, seacrh) {
        return __awaiter(this, void 0, void 0, function () {
            var text, operation;
            return __generator(this, function (_a) {
                text = "SELECT * FROM ".concat(table, " WHERE ").concat(where, " = ?");
                operation = connect_1.mySqlConnection.query(text, seacrh, function (err, result) {
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
    UserService.prototype.addUser = function (res, table, values) {
        return __awaiter(this, void 0, void 0, function () {
            var password, saltRounds, hashedPassword_1, _a, text, operation;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        password = crypto_1.default.randomBytes(4).toString('hex');
                        saltRounds = 10;
                        return [4 /*yield*/, bcrypt_1.default.hash(password, saltRounds)];
                    case 1:
                        hashedPassword_1 = _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        text = "INSERT INTO ".concat(table, " SET ?");
                        operation = connect_1.mySqlConnection.query(text, { values: values, password: hashedPassword }, function (err, result) {
                            var sk = process.env.JWT_SECRET;
                            if (err) {
                                if (err.code === 'ER_DUP_ENTRY') {
                                    return new response_1.ResponseService(null, 'Girdiğiniz bilgiler sistemimizde kayıtlı.').error400(res);
                                }
                                if (err.code === 'ER_DATA_TOO_LONG') {
                                    return new response_1.ResponseService(null, 'Girdiğiniz bilgileri tekrar kontrol ediniz.').error400(res);
                                }
                                return new response_1.ResponseService(null, 'Server internal error!').error500(res);
                            }
                            if (result.insertId) {
                                var id_1 = result.insertId;
                                var confirmationPayload = { sub: id_1 };
                                jsonwebtoken_1.default.sign(confirmationPayload, sk, function (error, encoded) {
                                    if (encoded) {
                                        var utext = "UPDATE ".concat(table, " SET confirmation_token = ? WHERE id = ?");
                                        connect_1.mySqlConnection.query(utext, [encoded, id_1]);
                                    }
                                    else {
                                        console.log(error);
                                    }
                                });
                                return new response_1.ResponseService(null, 'Success').created(res);
                                /*const transporter = nodemailer.createTransport({
                                    host: 'smtp.gmail.com',
                                    port: 587,
                                    secure: false,
                                    auth: {
                                      user: 'your-email@gmail.com',
                                      pass: 'your-password'
                                    }
                                  });
                                  const mailOptions = {
                                    from: 'your-email@gmail.com',
                                    to: 'recipient-email@gmail.com',
                                    subject: 'New Password',
                                    text: `Your new password is: ${password}`
                                  };
                            
                                  transporter.sendMail(mailOptions, (error
                            } */
                            }
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.deleteUser = function (req, res, table, where, values) {
        return __awaiter(this, void 0, void 0, function () {
            var text, operation;
            return __generator(this, function (_a) {
                text = "DELETE FROM ".concat(table, " WHERE ").concat(where, " = \"").concat(values, "\"");
                operation = connect_1.mySqlConnection.query(text, values, function (err, result) {
                    if (err != null)
                        return new response_1.ResponseService(null, 'Something went wrong').error400(res);
                    if (result) {
                        return new response_1.ResponseService(result, 'Success').created(res);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    UserService.prototype.updateUser = function (req, res, table, columns, values, where) {
        return __awaiter(this, void 0, void 0, function () {
            var cols, clause, i, sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cols = '';
                        clause = '';
                        for (i = 0; i < columns.length; i++) {
                            if (i !== columns.length - 1) {
                                clause = columns[i] + ' = ?, ';
                            }
                            else {
                                clause = columns[i] + ' = ? ';
                            }
                            cols += clause;
                        }
                        sql = "UPDATE ".concat(table, " SET ").concat(cols, " WHERE ").concat(where);
                        return [4 /*yield*/, connect_1.mySqlConnection.query(sql, values, function (error, results, fields) {
                                if (error)
                                    return new response_1.ResponseService(null, 'Something went wrong').error400(res);
                                if (results.affectedRows === 0)
                                    return new response_1.ResponseService(null, '404 not founnd').error404(res);
                                if (results.affectedRows > 0)
                                    return new response_1.ResponseService(columns, 'Something went wrong').error400(res);
                            })];
                    case 1:
                        rows = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
function hashedPassword(err, result) {
    throw new Error('Function not implemented.');
}
