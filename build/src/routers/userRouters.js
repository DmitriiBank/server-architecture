var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PORT } from "../config/userServerConfig.js";
import { myLogger } from "../events/logger.js";
export const userRouters = (req, res, controller) => __awaiter(void 0, void 0, void 0, function* () {
    myLogger.log('We got the request');
    const { url, method } = req;
    const parsedUrl = new URL(url, `http://localhost:${PORT}`);
    switch (parsedUrl.pathname + method) {
        case "/" + "GET": {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Welcome to User API");
            break;
        }
        case "/api/users" + "POST": {
            yield controller.addUser(req, res);
            break;
        }
        case "/api/users" + "PUT": {
            yield controller.updateUser(req, res);
            break;
        }
        case "/api/users" + "DELETE": {
            yield controller.removeUser(req, res);
            break;
        }
        case "/api/users" + "GET": {
            yield controller.getAllUsers(req, res);
            break;
        }
        case "/api/user" + "GET": {
            yield controller.getUser(req, res, parsedUrl);
            break;
        }
        case "/api/logger" + "GET": {
            yield controller.getLogArray(req, res);
            break;
        }
        default: {
            res.writeHead(404, { "Content-Type": "txt/plain" });
            res.end("Page not found");
        }
    }
});
