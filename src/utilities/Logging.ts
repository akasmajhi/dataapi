import colors from 'colors';

export default class Logging {


    private _ = colors.enable();
    static log = (args: string, category?: string  | undefined) => {
        switch(category){
            case 'banner':
                this.banner(args);
                break;
            case 'info':
                this.info(args);
                break;
            case 'warn':
                this.warn(args);
                break;
            case 'debug':
                this.debug(args);
                break;
            case 'error':
                this.error(args);
                break;
            default:
                this.info(args);
        }
    }

    static banner = (args: string) => {
        console.log(args.green);
    }
    static info = (args: string) => {
        console.log(args.blue);
    }

    static warn = (args: string) => {
        console.log(args.cyan);
    }

    static debug = (args: string) => {
        console.log(args.white);
    }
    static error = (args: string) => {
        console.log(args);
    }
}
