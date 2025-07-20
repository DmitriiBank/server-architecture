var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { parseBody } from "../utils/tools.js";
import { myLogger } from "../events/logger.js";
export class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield parseBody(req);
            const isSuccess = this.userService.addUser(body);
            if (isSuccess) {
                res.writeHead(201, { "Content-Type": "text/plain" });
                res.end('User was added');
                myLogger.save(`User created with id ${body.id}`);
            }
            else {
                res.writeHead(409, { "Content-Type": "text/plain" });
                res.end('User already exists');
                myLogger.save(`Conflict: user with id ${body.id} already exists`);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield parseBody(req);
            if (!body || !body.id) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Invalid user data");
                myLogger.log("Invalid user data");
                return;
            }
            const isUpdated = this.userService.updateUser(body);
            if (isUpdated) {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("User was updated");
                myLogger.save(`User with id ${body.id} was updated`);
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("User not found");
                myLogger.save(`Conflict: user with id ${body.id} not found`);
            }
        });
    }
    removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield parseBody(req);
            const isDelete = this.userService.removeUser(body.id);
            if (isDelete) {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(isDelete));
                // emitter.emit('user_removed')
                myLogger.save(`User with id ${body.id} was deleted`);
            }
            else {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("User not found");
                myLogger.save(`Conflict: user with id ${body.id} not found`);
            }
        });
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = this.userService.getAllUsers();
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(users));
            myLogger.log("All users fetched");
        });
    }
    getUser(req, res, parsedUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parsedUrl.searchParams.get('userId');
            if (!id) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("User not found");
                myLogger.log("User not found");
                return;
            }
            const founded = this.userService.getUser(+id);
            if (founded !== null) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(founded));
                myLogger.save(`Fetched user with id: ${id}`);
            }
            else {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('User not found');
            }
        });
    }
    getLogArray(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allLogs = myLogger.getLogArray();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(allLogs));
        });
    }
}
