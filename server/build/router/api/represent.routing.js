"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var represents_controller_1 = require("../../controller/represents/represents.controller");
var router = (0, express_1.Router)();
router.post('/register', represents_controller_1.registerRepresent);
exports.default = router;
