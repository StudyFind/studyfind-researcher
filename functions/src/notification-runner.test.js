const admin = require('./__mocks__/admin');

const firestore = admin.firestore();

const context = { admin };
const Func = require("./notification-runner");

describe("notification-runner", () => {
    let func;

    beforeEach(async () => {
        func = Func(context);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("asks for all studies", async () => {
        firestore.data.mockReturnValueOnce(mStudies)

        await func();

        expect(firestore.set).toHaveBeenCalledTimes(0);

        expect(firestore.collection).toHaveBeenCalledTimes(1);
        expect(firestore.collection).toHaveBeenCalledWith("studies");
        expect(firestore.get).toHaveBeenCalledTimes(1);
    });

});

const mStudies = [
    {
        nctID: 'NCT000',
        notifications: [{
            text: 'TEST',
            times: [100],
            startDate: 0,
            endDate: 1000,
            lastNotified: 0
        }]
    }
]