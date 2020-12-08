//for reading and writing file
const fs = require('fs');
// Winston is open source library for logging the logs
const winston = require('winston');
//for making dir
const mkdirp = require('mkdirp');
//for taking args from file
const commandLineArgs = require('command-line-args');

/*
*  Winston is open source library for logging the logs
*  We take arguments from file or commandLine too
*  We are logging two servers logs, api and socket,,
*  it will create directories of both servers if not created
*  Passing two transports file
*  This need more changes.
*/

const optionDefinitions = [{
    name: 'console',
    alias: 'c', type: Number,
    defaultValue : 0
}];

const options = commandLineArgs(optionDefinitions, { partial: true });
(process as any).cliOptions = options;

let logPath = 'logs/all.log';
let logExPath = 'logs/exceptions.log';


if(process.env.SERVER_NAME){
    logPath = `logs/api/api.log`;
    logExPath = `logs/api/exceptions.log`;
    mkdirp(`logs/api`).then((err:string) => {
        if (!fs.existsSync(logExPath)) {
            fs.writeFileSync(logExPath, '');
        }
    });
}

const exceptionHandlers = [];
const transports = [];

transports.push(new winston.transports.File({
    level: 'info',
    filename: logPath,
    handleExceptions: true,
    json: true,
    colorize: false,
    timestamp: function(){return Date.now();}
}));

transports.push(new winston.transports.Console());

exceptionHandlers.push(
    new winston.transports.File({
        filename: logExPath
    })
);

const logger = new winston.createLogger({
    transports: transports,
    exceptionHandlers: exceptionHandlers,
    exitOnError: true
});

module.exports = logger;
