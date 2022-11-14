import { BhavRepository} from '../../repository/BhavRepository';
import { AppDataSource } from '../../data-source';
import { BhavEntity } from '../../database/entities/BhavEntity';
import {Bhav} from '../../types/Bhav';
import Logging from '../../utilities/Logging';
/**
    * This is a wrapper class that encapsulates the daily bhav data
*/
export class DailyBhavService{
private bhavRepo: BhavRepository; 
private className = 'DailyBhavService';
private log = Logging.log;

    constructor(){
        this.bhavRepo = AppDataSource.getRepository(BhavEntity);
    }    

    public index = async (bhavDate: string | undefined) => {
        const methodName = 'index';
        this.log(`${this.className}:${methodName}: Into index bhavDate: [${bhavDate}]`, 'banner') ;
        // check if a date is passed.
        // If date passed, return for the given data
        // else return daily bhav for the current date
        if(bhavDate){
            this.log(`${this.className}:${methodName}: bhavDate: [${bhavDate}]`, 'debug');
            return (await this.bhavRepo.findBy({
                timestamp: bhavDate
            }));
        }
        // below code for today's date (Or yesterday if today's data not yet available
        return ({error: `You must provide a date.`});
    }

    public create = async (data: Bhav[]) => {
        const methodName = `create`;
        this.log(`${this.className}:${methodName}: Going to create daily bhav`, `debug`);
        this.log(`${this.className}:${methodName}: Data size: [${data.length}]`, `info`);
        if(data && data.length > 0){
            for(let cnt=0; cnt<data.length; cnt++){
                await this.bhavRepo.save(data[cnt]);
            }
            return data;
        }
    }
}
