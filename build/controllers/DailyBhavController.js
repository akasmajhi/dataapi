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
exports.DailyBhavController = void 0;
const express_1 = require("express");
// import { BhavEntity } from '../database/entities/BhavEntity';
const service_1 = require("../services/dailybhav/service");
const Logging_1 = __importDefault(require("../utilities/Logging"));
class DailyBhavController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`${__filename}:index: Into the index/read method`);
            if (req.params.bhavDate) {
                // bhav date is passed; hence, return the bhav copy for the provided date
                Logging_1.default.debug(`${__filename}:params: ${req.params.bhavDate}`);
                const data = yield this.dailyBhavService.index(req.params.bhavDate);
                if (data) {
                    return res.status(200).json(data);
                }
                else {
                    return res.status(400).json({ message: `No data for ${req.params.bhavDate}` });
                }
            }
            else {
                // Default it current date and format as well
                Logging_1.default.debug(`${__filename}: bhav date not provided. Defaulting to current`);
                const data = yield this.dailyBhavService.index(undefined);
                return res.status(200).json(data);
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`${__filename}:create:  the create method`);
            Logging_1.default.debug(`${__filename}:create: Body lenght ${req.body.length}`);
            if (req.body.length === undefined) {
                return res.status(400).json({ "message": "Invalid request, no body!" });
            }
            Logging_1.default.debug(`${__filename}:create Body of the request: [${req.body}]`);
            Logging_1.default.debug(req.body);
            return (res.status(200).json(yield this.dailyBhavService.create(req.body)));
            // res.status(200).json(req.body);
            /*
            const bhav = req['body'] as BhavEntity;
            //const bhav = req.body;
            Logging.debug(`${bhav.symbol}: date: ${bhav.timestamp}`);
            // TBD: Check if the row exists or not
            const existingBhav = await this.bhavService.getBhavForADay(bhav.timestamp);
            Logging.info(`bhavController: existingBhav [${existingBhav}]`);
            if(existingBhav)
                Logging.info(`bhavController:create The bhav is existing for date: [${existingBhav?.timestamp}]`);
            if(!existingBhav)
                res.status(200).send(await this.bhavService.create(bhav));
            */
            // res.status(200).send(`{"Ok": "Bhav.Create"}`);
        });
        this.update = (_, res) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`${__filename}: update:  the update method`);
            res.status(200).send(`{"update": "ok"}`);
            //res.status(200).send(this.bhavService.update());
        });
        this.delete = (_, res) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`${__filename}: delete: the delete method`);
            res.status(200).send(`{"delete": "ok"}`);
            // res.status(200).send(this.bhavService.delete());
        });
        this.router = (0, express_1.Router)();
        this.dailyBhavService = new service_1.DailyBhavService();
        this.routes();
    }
    /**
     * Configure the routes of the controller
     */
    routes() {
        this.router.get('/', this.index);
        this.router.get('/:bhavDate', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
exports.DailyBhavController = DailyBhavController;
