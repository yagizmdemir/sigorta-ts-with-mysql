"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
require("express-async-errors");
var router_1 = __importDefault(require("./router"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 1337;
app.use(express_1.default.json());
app.use(express_1.default.json({
    limit: '50mb',
}));
app.use(express_1.default.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
}));
app.use('/api', router_1.default);
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
