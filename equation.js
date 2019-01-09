const axios = require('axios');
const chalk = require('chalk');
const config = require('./config.json');

exports.getEquation = async() => {
    const equation = await axios.get(config.equationUrl);
    return equation.data;
};

exports.solveEquation = ({operation, left, right}) => {
    switch(operation){
        case 'addition':
            return left + right;
        case 'subtraction':
            return left - right;
        case 'multiplication':
            return left * right;
        case 'division':
            return left / right;
        case 'remainder':
            return left % right;
        default:
            throw new Error(`Operation '${operation}' not supported`);
    }
};

exports.submitEquation = async(id, result) => {
    try{
        const res = await axios.post(config.submissionUrl, {id, result});
        return `Successfully submitted equation ${id} [${res.status}]`;
    }
    catch(e){
        throw new Error(chalk.red(`Error submitting equation id ${id} with result ${result}`));
    }
};