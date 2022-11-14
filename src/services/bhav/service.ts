import { BhavRepository} from '../../repository/BhavRepository';
import { AppDataSource } from '../../data-source';
import { BhavEntity } from '../../database/entities/BhavEntity';
import Logging from '../../utilities/Logging';

export class BhavService{
    private bhavRepo: BhavRepository; 

    constructor(){
        this.bhavRepo = AppDataSource.getRepository(BhavEntity);
    }

    public index = async () => {
        Logging.debug(`BhavService: bhavRepo: [${this.bhavRepo}]`);
        return await this.bhavRepo.find()
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
    }
    public create = async (bhav: BhavEntity) => {
        Logging.debug(`BhavController:create: the data passed is: [${bhav}]`);
        const data = await this.bhavRepo.save(bhav);
        Logging.debug(`BhavController:create: data returned from DB: [${JSON.stringify(data)}]`);
        return data;
    }
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
    public update = () => {
        return `Index from Bhav update Service`;
    }
    public delete = () => {
        return `Index from Bhav delete Service`;
    }

    public getBhavForADay = async (day: string) => {
        Logging.debug(`BhavService: bhavRepo: [${this.bhavRepo}]`);
        Logging.debug(`BhavService:getBhavForADay day: [${day}]`);

        return await this.bhavRepo.findOneBy({
            timestamp: day,    
        })
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
    }
}
