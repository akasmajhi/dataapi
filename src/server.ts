import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';
import 'reflect-metadata' 
import Logging from './utilities/Logging';

import {BhavController} from './controllers/BhavController';
import {DailyBhavController} from './controllers/DailyBhavController';
import { AppDataSource } from './data-source';
import { APP_DEFS } from './constants';

class Server{

    private app: express.Application;

    private DEFAULT_PORT = APP_DEFS.DEFAULT_PORT;
    private DEAULT_SERVER:string = APP_DEFS.DEFAULT_SERVER;
    private BACKLOG:number = APP_DEFS.BACKLOG;

    private bhavController: BhavController;
    private dailyBhavController: DailyBhavController;

    constructor(){
        this.app = express();
        this.configuration();
        this.bhavController = new BhavController();
        this.dailyBhavController = new DailyBhavController(); 
        this.routes();
    }
    /**
     * Method to configure the express server. 
     * If n port is specified then default port is configured as 3333
     */ 
     public configuration(){
         this.app.set("port", process.env.port || this.DEFAULT_PORT);
         // Body parser middleware
         this.app.use(express.json({limit: '50mb'}));
         // for HTTP form data
         // this.app.use(express.urlencoded({ extended: true }));
         // this.app.use(bodyParser.json({limit: '50mb'}));
         // this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
     }
     /**
      * Method to configure the routes of the application
      */
    public async routes(){
        await AppDataSource.initialize()
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
                  this.app.get("/", (_: Request, res: Response) => {
                      res.status(200).send(`Welcome to the Paisa API`);
                  })
            })
            .catch((err) => {
                Logging.error(err);
                // Ideally you should exit from here in case DB Connection fails!
                Logging.error(`${__filename} :  Database connection Failed! Exiting . . .`);
                process.exit(1);
            })
      }
      /**
       * Start the server now
       * [DONE] Where is the middleware configured?
       * It is configured in the `configuration` method above.
       */
       public start(){
           const ts = new Date();
           const timestamp = ts.getHours() +":" + ts.getMinutes() + ":" + ts.getSeconds() + ": ";
           this.app.listen(this.app.get("port"),
               this.DEAULT_SERVER,
               this.BACKLOG, () => {
                   Logging.info(`[${timestamp}]Server is listening on port: [${this.app.get('port')}]`);
               });
       }
}
const server = new Server();
server.start();
