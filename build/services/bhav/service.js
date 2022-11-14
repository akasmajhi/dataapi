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
exports.BhavService = void 0;
const data_source_1 = require("../../data-source");
const BhavEntity_1 = require("../../database/entities/BhavEntity");
const Logging_1 = __importDefault(require("../../utilities/Logging"));
class BhavService {
    constructor() {
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`BhavService: bhavRepo: [${this.bhavRepo}]`);
            return yield this.bhavRepo.find();
            /* .then(data => {
                    Logging.log(`$$$$$$$$$$$$$$$$$#################: ${JSON.stringify(data)}`);
                    if(!data) return null;
                    Logging.log(`%%%%%%%%%%%%%%%%%: type: ${typeof(data)}`);
                    Logging.log(data[0]);
                    return data;
                })
                .catch(err => {
                    Logging.log(`Error occured while fetching the data`);
                    Logging.log(`Error: ${err}`);
                }) */ //return `Index from Bhav Service`;
        });
        this.create = (bhav) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`BhavController:create: the data passed is: [${bhav}]`);
            const data = yield this.bhavRepo.save(bhav);
            Logging_1.default.debug(`BhavController:create: data returned from DB: [${JSON.stringify(data)}]`);
            return data;
        });
        /*
            insert into bhav (series, symbol, open, high, low, close, last, previous_close, total_traded_quantity, total_traded_value, timestamp) values ('EQ', 'INFY', 1596.45, 1612, 1585, 1606.25, 1607.2, 1596.45, 4067324, 6519451947.6, '17-08-2022');
    {
            "id": 1,
            "symbol": "INFY",
            "series": "EQ",
            "open": 1596,
            "high": 1612,
            "low": 1585,
            "close": 1606,
            "last": 1607,
            "previous_close": 1596,
            "total_traded_quantity": 4067324,
            "total_traded_value": "6519451948",
            "timestamp": "17-08-2022"
        }
        */
        this.update = () => {
            return `Index from Bhav update Service`;
        };
        this.delete = () => {
            return `Index from Bhav delete Service`;
        };
        this.getBhavForADay = (day) => __awaiter(this, void 0, void 0, function* () {
            Logging_1.default.debug(`BhavService: bhavRepo: [${this.bhavRepo}]`);
            Logging_1.default.debug(`BhavService:getBhavForADay day: [${day}]`);
            return yield this.bhavRepo.findOneBy({
                timestamp: day,
            });
            /* .then(data => {
                    Logging.log(`$$$$$$$$$$$$$$$$$#################: ${JSON.stringify(data)}`);
                    if(!data) return null;
                    Logging.log(`%%%%%%%%%%%%%%%%%: type: ${typeof(data)}`);
                    Logging.log(data[0]);
                    return data;
                })
                .catch(err => {
                    Logging.log(`Error occured while fetching the data`);
                    Logging.log(`Error: ${err}`);
                }) */ //return `Index from Bhav Service`;
        });
        this.bhavRepo = data_source_1.AppDataSource.getRepository(BhavEntity_1.BhavEntity);
    }
}
exports.BhavService = BhavService;
