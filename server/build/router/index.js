"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_routing_1 = __importDefault(require("./api/user.routing"));
var represent_routing_1 = __importDefault(require("./api/represent.routing"));
var router = (0, express_1.Router)();
router.use(user_routing_1.default);
router.use(represent_routing_1.default);
exports.default = router;
