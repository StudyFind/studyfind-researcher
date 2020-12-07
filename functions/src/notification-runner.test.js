const admin = require("firebase-admin");
admin.initializeApp();
const context = { admin };
const Func = require("./reset-study");

describe("notification-runner", () => {
    let func;
    let req;
    let res;

    beforeEach(async () => {
        func = Func(context);
        req = { query: { nctID: "NCTID", idToken: "IDTOKEN" } };
        res = { json: jest.fn(), status: jest.fn(), set: jest.fn() };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

});