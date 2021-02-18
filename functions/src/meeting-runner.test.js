const admin = require("./__mocks__/admin");
const firestore = admin.firestore();

const context = { admin };
const Func = require("./meeting-runner");

describe("meeting-runner", () => {
    let func;

    beforeEach(async () => {
        func = Func(context);
    });

    afterEach(() => {
        jest.clearAllMocks();
        firestore.reset();
    });

    it("calls all proper functions", async () => {
        firestore.data = mFirestore();
        admin.firestore.Timestamp.now.mockReturnValueOnce(1000 * 60 * 30);

        await func();

        expect(firestore.collection).toHaveBeenCalled();
        expect(firestore.get).toHaveBeenCalled();
    });

    it("creates a researcher notification", async () => {
        firestore.data = mFirestore();
        admin.firestore.Timestamp.now.mockReturnValueOnce(1000 * 60 * 30);

        await func();

        const snap = await firestore
            .collection("researchers").doc("TEST_RESEARCHER_ID")
            .collection("notifications").get();
        expect(snap.empty).toBe(false);
    });

    it("creates a participant notification", async () => {
        firestore.data = mFirestore();
        admin.firestore.Timestamp.now.mockReturnValueOnce(1000 * 60 * 30);

        await func();

        const snap = await firestore
            .collection("participants").doc("TEST_PARTICIPANT_ID")
            .collection("notifications").get();
        expect(snap.empty).toBe(false);
    });

    it("notifies for all meetings in past 30 minutes", async () => {
        firestore.data = mFirestore();
        admin.firestore.Timestamp.now.mockReturnValueOnce(1000 * 60 * 35); // 35 minutes

        await func();

        expect(firestore.add).toHaveBeenCalled();
    });

});

const mFirestore = () => ({
    collection: {
        studies: {
            "TEST_STUDY_ID": {
                nctID: "TEST_STUDY_ID",
                researcher: {
                    id: "TEST_RESEARCHER_ID",
                }
            }
        },
        researchers: {
            "TEST_RESEARCHER_ID": {}
        },
        participants: {
            "TEST_PARTICIPANT_ID": {}
        },
        meetings: {
            "TEST_MEETING_ID": {
                name: "TEST_MEETING_NAME",
                link: "TEST_MEETING_LINK",
                participantID: "TEST_PARTICIPANT_ID",
                studyID: "TEST_STUDY_ID",
                time: 1000 * 60 * 30, // 30 mins
            }
        }
    }
});