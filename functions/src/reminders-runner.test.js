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

    it("calls all proper functions (base case)", async () => {
        firestore.data.mockReturnValueOnce(mStudies()).mockReturnValueOnce(mParticipants());
        firestore.Timestamp.now.mockReturnValueOnce(100);

        await func();

        expect(firestore.collection).toHaveBeenCalled();
        expect(firestore.collection).toHaveBeenCalledWith("studies");
        expect(firestore.get).toHaveBeenCalled();
        expect(firestore.set).toHaveBeenCalled();
    });

    it("adds correct reminders to participant", async () => {
        firestore.data.mockReturnValueOnce(mStudies()).mockReturnValueOnce(mParticipants())
        firestore.Timestamp.now.mockReturnValueOnce(100);

        await func();

        expect(firestore.collection).toHaveBeenLastCalledWith("participants");
        expect(firestore.doc).toHaveBeenLastCalledWith("TEST_PARTICIPANT_ID");
        expect(firestore.set).toHaveBeenLastCalledWith({ reminders: ["TEST"] }, { merge: true });
    });

});

// these are functions so they aren't alterable between tests
const mStudies = () => [
    {
        id: "NCT000",
        nctID: "NCT000",
        reminders: [{
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