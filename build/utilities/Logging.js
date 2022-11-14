"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
class Logging {
    constructor() {
        this._ = colors_1.default.enable();
    }
}
exports.default = Logging;
_a = Logging;
Logging.log = (args, category) => {
    switch (category) {
        case 'banner':
            _a.banner(args);
            break;
        case 'info':
            _a.info(args);
            break;
        case 'warn':
            _a.warn(args);
            break;
        case 'debug':
            _a.debug(args);
            break;
        case 'error':
            _a.error(args);
            break;
        default:
            _a.info(args);
    }
};
Logging.banner = (args) => {
    console.log(args.green);
};
Logging.info = (args) => {
    console.log(args.blue);
};
Logging.warn = (args) => {
    console.log(args.cyan);
};
Logging.debug = (args) => {
    console.log(args.white);
};
Logging.error = (args) => {
    console.log(args);
};
