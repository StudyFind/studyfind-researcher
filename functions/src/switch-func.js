// `functions/src/switch-func.js`

const { logger } = require("firebase-functions");

// import the switch list of cloud functions
const funcs = require('./utils/switch-list');
// note, the const below needs to match exported
// func name in `/functions/index.js` for switch to work
const thisFuncNameAsRegex = /studies\/(\w*)/;

// Take the request url, figure out which 'subfunction' user is trying to hit,
// and pas the req, res on to it. Query like: `/studies/<targetFunc>`
module.exports = (ctx) => {

    // init all funcs
    Object.keys(funcs).forEach((name) => {
        funcs[name] = funcs[name](ctx);
    })

    return async (req, res) => {
        res.set("Access-Control-Allow-Origin", "*");

        const match = req.originalUrl.match(thisFuncNameAsRegex);
        if (match === null) return res.json({ error: "please specify a function to call" });
        const name = match[1];
        if (!funcs[name]) return res.json({ error: `function '${name}' does not exist` });

        logger.log(`running function '${name}'`);

        return funcs[name](req, res);
    }
}