"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var users_seeder_1 = __importDefault(require("./users.seeder"));
var index_1 = __importDefault(require("./../db/index"));
index_1.default(function () {
    users_seeder_1.default();
});
