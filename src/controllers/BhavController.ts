import {Router, Request, Response} from 'express';
import { BhavEntity } from '../database/entities/BhavEntity';

import {BhavService} from '../services/bhav/service';
import Logging from '../utilities/Logging';

export class BhavController{
    public router: Router;
    private bhavService: BhavService;

    constructor(){
        this.router = Router();
        this.bhavService = new BhavService();
        this.routes();
    }

    public index = async (_: Request, res: Response) => {
        Logging.debug(`Into the index/read method`);
        res.status(200).send(await this.bhavService.index());
    }
    public create = async (req: Request, res: Response) => {
        Logging.debug(`Into the create method`);
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
        // res.status(200).send(`{"Ok": "Bhav.Create"}`);
    }
    public update = async (_: Request, res: Response) => {
        Logging.debug(`Into the update method`);
        res.status(200).send(this.bhavService.update());
    }
    public delete = async (_: Request, res: Response) => {
        Logging.debug(`Into the delete method`);
        res.status(200).send(this.bhavService.delete());
    }

    public getBhavForADay = async (_: Request, res: Response) => {
        Logging.debug(`Into the getBhavForADay method`);
        // TBD: Extract day from the request
        // Validate the day - DD-MMM-YYYY
        // TBD: Call the respective service method
        res.status(200).send(await this.bhavService.index());
    }
    /**
     * Configure the routes of the controller
     */ 

    public routes(){
        this.router.get('/', this.index);
        this.router.post('/', this.create);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }
}
