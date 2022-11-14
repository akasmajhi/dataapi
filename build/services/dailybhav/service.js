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
exports.DailyBhavService = void 0;
const data_source_1 = require("../../data-source");
const BhavEntity_1 = require("../../database/entities/BhavEntity");
const Logging_1 = __importDefault(require("../../utilities/Logging"));
/**
    * This is a wrapper class that encapsulates the daily bhav data
*/
class DailyBhavService {
    constructor() {
        this.className = 'DailyBhavService';
        this.log = Logging_1.default.log;
        this.index = (bhavDate) => __awaiter(this, void 0, void 0, function* () {
            const methodName = 'index';
            this.log(`${this.className}:${methodName}: Into index bhavDate: [${bhavDate}]`, 'banner');
            // check if a date is passed.
            // If date passed, return for the given data
            // else return daily bhav for the current date
            if (bhavDate) {
                this.log(`${this.className}:${methodName}: bhavDate: [${bhavDate}]`, 'debug');
                return (yield this.bhavRepo.findBy({
                    timestamp: bhavDate
                }));
            }
            // below code for today's date (Or yesterday if today's data not yet available
            return ({ error: `You must provide a date.` });
        });
        this.create = (data) => __awaiter(this, void 0, void 0, function* () {
            const methodName = `create`;
            this.log(`${this.className}:${methodName}: Going to create daily bhav`, `debug`);
            this.log(`${this.className}:${methodName}: Data size: [${data.length}]`, `info`);
            if (data && data.length > 0) {
                for (let cnt = 0; cnt < data.length; cnt++) {
                    yield this.bhavRepo.save(data[cnt]);
                }
                return data;
            }
        });
        this.bhavRepo = data_source_1.AppDataSource.getRepository(BhavEntity_1.BhavEntity);
    }
}
exports.DailyBhavService = DailyBhavService;
