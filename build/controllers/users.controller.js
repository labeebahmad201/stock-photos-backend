"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
var helpers_1 = require("./../helpers");
function login(req, res) {
    var response = { id: 1, name: 'labeeb1' };
    return helpers_1.sendResp(res, response);
}
exports.login = login;
