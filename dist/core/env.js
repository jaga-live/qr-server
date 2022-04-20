"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var env = process.env;
exports.ENV = {
    NODE_ENV: env.NODE_ENV,
    JWT_SECRET: env.JWT_SECRET
};
//# sourceMappingURL=env.js.map