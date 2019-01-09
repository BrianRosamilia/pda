const promise = require('bluebird');
const chalk = require('chalk');
const equation = require('./equation');
const config = require('./config.json');

(async() => {
    while(true){
        try{
            const eq = await equation.getEquation();
            const equationResult = equation.solveEquation(eq);
            const result = await equation.submitEquation(eq.id, equationResult);
            console.log(chalk.green(result));
        }
        catch(e){//Default axios configuration treats 400 and 500 HTTP status codes as errors
            console.error(e);
        }
        finally{
            await promise.delay(config.pollDelay);//Add a delay even if an error is encountered
        }
    }
})();