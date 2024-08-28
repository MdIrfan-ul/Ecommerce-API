import fs from "fs";
import winston, { transports } from "winston";

const logPromise = fs.promises;


// async function log(logData){
//     try {
//         logData = `\n ${new Date().toString()}-${logData}`;
//        await logPromise.appendFile('log.txt',logData);
//     } catch (error) {
//         console.log(error);
//     }
// }

// Winston Logger

const logger = winston.createLogger({

    level:'info',
    format:winston.format.json(),
    defaultMeta: { service: 'request-logging' },
    transports:[new winston.transports.File({filename:"log.txt"})],

})


// middleware for calling the logs


const logMiddleware = async (req,res,next)=>{
    if(!req.url.includes("signin")){
    const logData = `${req.url} - ${JSON.stringify(req.body)}`
    logger.info(logData)
    }
    next();
}

export default logMiddleware;