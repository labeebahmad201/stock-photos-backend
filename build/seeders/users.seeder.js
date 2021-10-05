"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_model_1 = __importDefault(require("../models/user.model"));
function default_1() {
    console.log('user seeder has started');
    var users = [];
    for (var i = 0; i < 10; i++) {
        users.push({
            id: 1,
            firstname: 'test',
            lastname: 'test',
            email: 'test@testmai.com',
            created_at: Date.now(),
            updated_at: Date.now()
        });
    }
    user_model_1.default.insertMany(users)
        .then(function (r) {
        console.log('done seeding users', r);
    })
        .catch(function (e) {
        console.log('users seeding failed');
    });
}
exports.default = default_1;
