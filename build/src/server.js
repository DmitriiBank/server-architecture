var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createServer } from "node:http";
import { PORT } from "./config/userServerConfig.js";
import { userRouters } from "./routers/userRouters.js";
import { UserController } from "./controllers/UserController.js";
import { UserServiceEmbeddedImpl } from "./service/UserServiceEmbeddedImpl.js";
export const launchServer = () => {
    const userService = new UserServiceEmbeddedImpl();
    const userController = new UserController(userService);
    createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        yield userRouters(req, res, userController);
    })).listen(PORT, () => {
        console.log(`UserServer runs at http://localhost:${PORT}`);
    });
};
