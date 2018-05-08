const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Argparse example'
});

const arguments = [
    {
        flags: [],
        options: {
            help: "The name of the model to be added",
            dest: "name",
            required: true
        }
    }, {
        flags: [],
        options: {
            help: "The attributes of the model",
            dest: "model",
            required: true,
            nargs: '+',
            type: model => {
                const regex = /ˆ*:(string|number|date|buffer|boolean|mixed|objectid|array|decimal128)(-r)*$/;
                if (regex.test(model)) return model;
                else throw `Incorrect usage of argument ${model}`;
            }
        }
    }
]

arguments.forEach(arg => parser.addArgument(arg.flags, arg.options));

const args = parser.parseArgs();
console.log(args);