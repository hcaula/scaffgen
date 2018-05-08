/*
 * Dependencies
*/
const { ArgumentParser } = require('argparse');

/* Declaring Argument Parser */
const parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'Scaffgen'
});

/* Declaring accepted arguments */
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
            help: "The attributes of the model. Usage: [attribute]:[type] or [attribute]:[type]-r if attribute is required",
            dest: "model",
            required: true,
            nargs: '+',
            type: model => {
                const regex = /ˆ*:(string|number|date|buffer|boolean|mixed|objectid|decimal128|any)(-u|-r|-min[\d]*|-max[\d]*)*$/;
                if (regex.test(model)) return model;
                else throw `Incorrect usage of argument ${model}`;
            }
        }
    }
]

/* Add arguments to parser */
arguments.forEach(arg => parser.addArgument(arg.flags, arg.options));

/* Custom parsing of attributes */
const parseAttributes = function () {
    const terminalArgs = parser.parseArgs();

    let model = { name: terminalArgs.name, attributes: [] };

    terminalArgs.model.forEach(attr => {
        let attribute = {};

        attribute.name = attr.substring(0, attr.indexOf(':'));
        attribute.type = attr.match(/:(string|number|date|buffer|boolean|mixed|objectid|array|decimal128)/)[1];
        attribute.required = /ˆ*:*(-r)(.)*$/.test(attr);
        attribute.unique = /ˆ*:*(-u)(.)*$/.test(attr);

        if (attribute.type == 'number') {
            const hasMin = attr.match(/ˆ*:*(-min[/d]*)(.)*$/);
            const hasMax = attr.match(/ˆ*:*(-max[/d]*)(.)*$/);

            if (hasMin) attribute.min = hasMin[0].match(/\d+/)[0];
            if (hasMax) attribute.max = hasMax[0].match(/\d+/)[0];
        }

        model.attributes.push(attribute);
    });

    return model;
}

module.exports = parseAttributes();

