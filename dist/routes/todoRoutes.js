"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var todoController_1 = require("../controllers/todoController");
var authMiddleware_1 = require("../middlewares/authMiddleware");
var router = express_1.default.Router();
router.post('/', authMiddleware_1.authenticate, todoController_1.createTodo);
router.get('/', authMiddleware_1.authenticate, todoController_1.getTodos);
exports.default = router;
