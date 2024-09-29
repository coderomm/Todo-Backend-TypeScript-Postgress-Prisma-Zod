"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var userRoutes_1 = __importDefault(require("./routes/userRoutes"));
var todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
var prisma = new client_1.PrismaClient();
var app = (0, express_1.default)();
var PORT = 3000;
app.use(express_1.default.json());
app.use('/users', userRoutes_1.default);
app.use('/todos', todoRoutes_1.default);
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
