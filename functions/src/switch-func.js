// `functions/src/switch-func.js`

const { logger } = require("firebase-functions");

// import the switch list of cloud functions
const funcs = require('./utils/switch-list');

// const matcherRegex = /studies\/(\w*)/;

// Take the request url, figure out which 'subfunction' user is trying to hit,
// and pas the req, res on to it. Query like: `/studies/<targetFunc>`
module.exports = (ctx) => {

    // init all funcs
    Object.keys(funcs).forEach((name) => {
        funcs[name] = funcs[name](ctx);
    })

    return async (req, res) => {
        res.set("Access-Control-Allow-Origin", "*");

        const path = new URL("http://ha-fake-server.com" + req.originalUrl).pathname.split('/');
        const i = path.indexOf("studies");
        if (i === path.length) return res.json({ error: "please specify a function to call" });
        const name = path[i + 1];
        if (!funcs[name]) return res.json({ error: `function '${name}' does not exist` });

        logger.info(`running function '${name}' from`, req.originalUrl);

        return funcs[name](req, res);
    }
}