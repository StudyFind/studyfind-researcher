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
        firestore.reset();
    });

    test("firestore mock works correctly", async () => {
        const data = () => ({
            collection: {
                studies: {
                    "TEST_STUDY_ID": {
                        title: "TEST_TITLE",
                        collection: {
                            participants: {
                                "PARTICIPANT_ID": {
                                    name: "TEST_NAME"
                                }
                            }
                        }
                    }
                }
            }
        })
        firestore.data = data()

        let studies = await firestore.collection("studies").get();
        expect(studies.empty).toBe(false);
        expect(studies.length).toBe(1);
        expect(studies[0].id).toBe('TEST_STUDY_ID');
        expect(studies[0].data().title).toEqual('TEST_TITLE');
        expect(firestore.data).toEqual(data());
        expect(firestore.path).toEqual([]);
        expect(firestore.queries).toEqual([["collection", "studies"]]);

        let study = await firestore.collection("studies").doc("TEST_STUDY_ID").get();
        expect(study.exists).toBe(true);
        expect(study.data().title).toEqual("TEST_TITLE");
        expect(study.data().collections).toBeUndefined();
        expect(firestore.data).toEqual(data());
        expect(firestore.path).toEqual([]);

        await firestore.collection("studies").doc("TEST_STUDY_ID_2").set({ title: "TEST_TITLE_2", collection: { participants: { name: "TEST_NAME_2" } } });
        studies = await firestore.collection("studies").get();
        expect(studies.length).toBe(2);

        let participants = await firestore.collection("studies").doc("TEST_STUDY_ID").collection("participants").get();
        expect(participants.empty).toBe(false);
        expect(participants.length).toBe(1);
        expect(participants[0].data()).toEqual({ name: 'TEST_NAME' });

        await firestore.collection("studies").doc("TEST_STUDY_ID_2").update({ title: "TEST_TITLE_2_REVISED" });
        study = await firestore.collection("studies").doc("TEST_STUDY_ID_2").get();
        expect(study.data().title).toBe("TEST_TITLE_2_REVISED");

        // await firestore.runTransaction(async t => {
        // });
    });

    it("calls all proper functions (base case)", async () => {
        firestore.data = mFirestore();
        firestore.Timestamp.now.mockReturnValueOnce(1000 * 60 * 30);

        await func();

        expect(firestore.collection).toHaveBeenCalled();
        expect(firestore.get).toHaveBeenCalled();
        expect(firestore.update).toHaveBeenCalled();

        expect(firestore.set).not.toHaveBeenCalled();
    });

    it("adds correct reminders to participant", async () => {
        firestore.data = mFirestore();
        firestore.Timestamp.now.mockReturnValueOnce(1000 * 60 * 30);

        await func();

        const study = await firestore.collection("studies").doc("TEST_STUDY_ID").get();
        expect(study.exists).toBe(true);
        const studyData = study.data()
        expect(studyData.nctID).toBe("NCT000");

        const participant = await firestore.collection("studies").doc("TEST_STUDY_ID")
            .collection("participants").doc("TEST_PARTICIPANT_ID").get();
        expect(participant.exists).toBe(true);
        const participantData = participant.data();
        expect(participantData.fakeName).toBe("TEST_NAME");
        expect(participantData.currentReminders).toEqual(["TEST_REMINDER"]);
        expect(participantData.reminders.length).toBe(1);
        expect(participantData.reminders[0].lastReminded).toBe(1000 * 60 * 30);
    });

    it("respects start and end dates for reminders", async () => {
        firestore.data = mFirestore();
        firestore.data.collection.studies["TEST_STUDY_ID"]
            .collection.participants["TEST_PARTICIPANT_ID"]
            .reminders[0].startData = 1000 * 60 * 60 * 24;

        firestore.Timestamp.now.mockReturnValueOnce(0);
        await func();
        expect(firestore.update).not.toHaveBeenCalled();

        firestore.Timestamp.now.mockReturnValueOnce(1000 * 60 * 60 * 24 * 365 * 2); // 2 years
        await func();
        expect(firestore.update).not.toHaveBeenCalled();
    });

    it("doesn't add reminders if already reminded", async () => {
        firestore.data = mFirestore();
        firestore.data.collection.studies["TEST_STUDY_ID"]
            .collection.participants["TEST_PARTICIPANT_ID"]
            .reminders[0].lastReminded = 1000 * 60 * 30; // 30 mins
        firestore.Timestamp.now.mockReturnValueOnce(1000 * 60 * 60); // 60 mins

        await func();

        expect(firestore.update).not.toHaveBeenCalled();
    })

});

// its a function so its not alterable between tests by accident
const mFirestore = () => ({
    collection: {
        studies: {
            "TEST_STUDY_ID": {
                nctID: "NCT000",
                collection: {
                    participants: {
                        "TEST_PARTICIPANT_ID": {
                            fakeName: "TEST_NAME",
                            status: "accepted",
                            currentReminders: [],
                            reminders: [{
                                text: "TEST_REMINDER",
                                times: [1000 * 60 * 30], // 30 mins
                                startDate: 0,
                                endDate: 1000 * 60 * 60 * 24 * 365, // 1 year
                                lastReminded: 0
                            }]
                        }
                    }
                }
            }
        }
    }
})