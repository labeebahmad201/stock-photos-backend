"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var config = dotenv_1.default.config({
    path: __dirname + '/../../.env',
});
var env = process.env;
exports.default = env;
