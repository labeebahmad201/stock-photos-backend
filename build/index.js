"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("./config/dotenv"));
var routes_1 = __importDefault(require("./routes"));
var index_1 = __importDefault(require("./db/index"));
var app = express_1.default();
var PORT = dotenv_1.default.PORT;
app.listen(PORT, function () {
    console.log("Server is listening at port " + PORT);
    routes_1.default(app);
    index_1.default();
});
