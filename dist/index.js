"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const app = (0, express_1.default)();
//middlewares para serialización, des-serialización y cors
app.use(express_1.default.json());
app.use(cors());
app.listen(process.env.PORT_DEV, () => {
    console.log('Server running on port 3000');
});
