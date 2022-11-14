import {Router, Request, Response} from 'express';
// import { BhavEntity } from '../database/entities/BhavEntity';

import { DailyBhavService } from '../services/dailybhav/service';
import Logging from '../utilities/Logging';

export class DailyBhavController{
    public router: Router;
    private dailyBhavService: DailyBhavService;

    constructor(){
        this.router = Router();
        this.dailyBhavService = new DailyBhavService();
        this.routes();
    }

    public index = async (req: Request, res: Response) => {
        Logging.debug(`${__filename}:index: Into the index/read method`);
        if(req.params.bhavDate){
            // bhav date is passed; hence, return the bhav copy for the provided date
            Logging.debug(`${__filename}:params: ${req.params.bhavDate}`);
            const data = await this.dailyBhavService.index(req.params.bhavDate);
            if(data){
                return res.status(200).json(data);
            }else{
                return res.status(400).json({message: `No data for ${req.params.bhavDate}`});
            }
        }else{ 
            // Default it current date and format as well
            Logging.debug(`${__filename}: bhav date not provided. Defaulting to current`);
            const data = await this.dailyBhavService.index(undefined);
            return res.status(200).json(data);
        }
    }
    public create = async (req: Request, res: Response) => {
        Logging.debug(`${__filename}:create:  the create method`);
        Logging.debug(`${__filename}:create: Body lenght ${req.body.length}`);
        if(req.body.length === undefined){
            return res.status(400).json({"message": "Invalid request, no body!"});
        }
        Logging.debug(`${__filename}:create Body of the request: [${req.body}]`);
        Logging.debug(req.body);
        return (res.status(200).json(await this.dailyBhavService.create(req.body)));
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
    }
    public update = async (_: Request, res: Response) => {
        Logging.debug(`${__filename}: update:  the update method`);
        res.status(200).send(`{"update": "ok"}`);
        //res.status(200).send(this.bhavService.update());
    }
    public delete = async (_: Request, res: Response) => {
        Logging.debug(`${__filename}: delete: the delete method`);
        res.status(200).send(`{"delete": "ok"}`);
        // res.status(200).send(this.bhavService.delete());
    }
    /**
     * Configure the routes of the controller
     */ 

    public routes(){
        this.router.get('/', this.index);
        this.router.get('/:bhavDate', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
