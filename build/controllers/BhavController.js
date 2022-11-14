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
exports.BhavController = void 0;
const express_1 = require("express");
const service_1 = require("../services/bhav/service");
const Logging_1 = __importDefault(require("../utilities/Logging"));
class BhavController {
    constructor() {
        this.index = (_, res) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`Into the index/read method`);
            res.status(200).send(yield this.bhavService.index());
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`Into the create method`);
            const bhav = req['body'];
            //const bhav = req.body;
            Logging_1.default.debug(`${bhav.symbol}: date: ${bhav.timestamp}`);
            // TBD: Check if the row exists or not
            const existingBhav = yield this.bhavService.getBhavForADay(bhav.timestamp);
            Logging_1.default.info(`bhavController: existingBhav [${existingBhav}]`);
            if (existingBhav)
                Logging_1.default.info(`bhavController:create The bhav is existing for date: [${existingBhav === null || existingBhav === void 0 ? void 0 : existingBhav.timestamp}]`);
            if (!existingBhav)
                res.status(200).send(yield this.bhavService.create(bhav));
            // res.status(200).send(`{"Ok": "Bhav.Create"}`);
        });
        this.update = (_, res) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`Into the update method`);
            res.status(200).send(this.bhavService.update());
        });
        this.delete = (_, res) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`Into the delete method`);
            res.status(200).send(this.bhavService.delete());
        });
        this.getBhavForADay = (_, res) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`Into the getBhavForADay method`);
            // TBD: Extract day from the request
            // Validate the day - DD-MMM-YYYY
            // TBD: Call the respective service method
            res.status(200).send(yield this.bhavService.index());
        });
        this.router = (0, express_1.Router)();
        this.bhavService = new service_1.BhavService();
        this.routes();
    }
    /**
     * Configure the routes of the controller
     */
    routes() {
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
exports.BhavController = BhavController;
