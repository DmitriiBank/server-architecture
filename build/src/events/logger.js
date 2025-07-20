import { EventEmitter } from "node:events";
class Logger extends EventEmitter {
    constructor() {
        super(...arguments);
        this.logArray = [];
    }
    log(message) {
        this.emit('logger', message);
    }
    save(message) {
        this.emit('saved', message);
    }
    addLogToArray(message) {
        this.logArray.push({ date: new Date().toISOString(), message });
    }
    getLogArray() {
        return [...this.logArray];
    }
}
export const myLogger = new Logger();
myLogger.on('logger', (message) => {
    console.log(new Date().toISOString(), message);
});
myLogger.on('saved', (message) => {
    myLogger.addLogToArray(message);
});
