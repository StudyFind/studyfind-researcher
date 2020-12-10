const admin = require('./__mocks__/admin');

const firestore = admin.firestore();

const context = { admin };
const Func = require("./reminders-runner");

describe("reminders-runner", () => {
    let func;

    beforeEach(async () => {
        func = Func(context);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("asks for all studies", async () => {
        firestore.data.mockReturnValueOnce(mStudies()).mockReturnValueOnce(mParticipants())
        firestore.Timestamp.now.mockReturnValueOnce(100)

        await func();

        expect(firestore.set).toHaveBeenCalledTimes(0);

        expect(firestore.collection).toHaveBeenCalled();
        expect(firestore.collection).toHaveBeenCalledWith("studies");
        expect(firestore.get).toHaveBeenCalled();
    });

});

// these are functions so they aren't alterable between tests
const mStudies = () => [
    {
        nctID: "NCT000",
        reminders: [{
            id: "TEST_REMINDER_ID",
            text: "TEST",
            times: [0, 100],
            startDate: 0,
            endDate: 1000,
            lastNotified: 0
        }]
    }
]
const mParticipants = () => [
    {
        id: "TEST_PARTICIPANT_ID",
        fakeName: "TEST_NAME",
        status: "accepted",
        reminders: [],
    }
]