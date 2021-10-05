"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResp = void 0;
function sendResp(res, data) {
    var resp = JSON.stringify(data);
    return res.status(200).send(resp);
}
exports.sendResp = sendResp;
