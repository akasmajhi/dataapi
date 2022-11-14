"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const Logging_1 = __importDefault(require("./utilities/Logging"));
const BhavController_1 = require("./controllers/BhavController");
const DailyBhavController_1 = require("./controllers/DailyBhavController");
const data_source_1 = require("./data-source");
const constants_1 = require("./constants");
class Server {
    constructor() {
        this.DEFAULT_PORT = constants_1.APP_DEFS.DEFAULT_PORT;
        this.DEAULT_SERVER = constants_1.APP_DEFS.DEFAULT_SERVER;
        this.BACKLOG = constants_1.APP_DEFS.BACKLOG;
        this.app = (0, express_1.default)();
        this.configuration();
        this.bhavController = new BhavController_1.BhavController();
        this.dailyBhavController = new DailyBhavController_1.DailyBhavController();
        this.routes();
    }
    /**
     * Method to configure the express server.
     * If n port is specified then default port is configured as 3333
     */
    configuration() {
        this.app.set("port", process.env.port || this.DEFAULT_PORT);
        // Body parser middleware
        this.app.use(express_1.default.json({ limit: '50mb' }));
        // for HTTP form data
        // this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(bodyParser.json({limit: '50mb'}));
        // this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
    }
    /**
     * Method to configure the routes of the application
     */
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield data_source_1.AppDataSource.initialize()
                .then(() => {
                // Get going with the rest of the stuff!
                this.app.use("/api/bhav", this.bhavController.router);
                this.app.use("/api/dailybhav", this.dailyBhavController.router);
                /*
                this.app.get('/api/dailybhav/', (req: Request, res: Response) => {
                    Logging.debug(`Into /api/dailybhav: Params: [${req.params}]`);
                    res.status(200).send(`{ok: "No parameter supplied"}`);
                });
                this.app.get('/api/dailybhav/:bhavDate', (req: Request, res: Response) => {
                    Logging.debug(`Into /api/dailybhav: Params: [${req.params}]`);
                    console.log(req.params);
                    res.status(200).send(req.params);
                });
                */
                this.app.get("/", (_, res) => {
                    res.status(200).send(`Welcome to the Paisa API`);
                });
            })
                .catch((err) => {
                Logging_1.default.error(err);
                // Ideally you should exit from here in case DB Connection fails!
                Logging_1.default.error(`${__filename} :  Database connection Failed! Exiting . . .`);
                process.exit(1);
            });
        });
    }
    /**
     * Start the server now
     * [DONE] Where is the middleware configured?
     * It is configured in the `configuration` method above.
     */
    start() {
        const ts = new Date();
        const timestamp = ts.getHours() + ":" + ts.getMinutes() + ":" + ts.getSeconds() + ": ";
        this.app.listen(this.app.get("port"), this.DEAULT_SERVER, this.BACKLOG, () => {
            Logging_1.default.info(`[${timestamp}]Server is listening on port: [${this.app.get('port')}]`);
        });
    }
}
const server = new Server();
server.start();
