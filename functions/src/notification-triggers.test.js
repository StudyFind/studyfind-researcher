const admin = require("./__mocks__/admin");
const firestore = admin.firestore();

const context = { admin };
const Funcs = require("./notification-triggers");



// describe each function individually

describe("notification-triggers.onCreateStudy", () => {
    let func;

    beforeEach(async () => {
        func = Funcs.onCreateStudy(context)
    });

    afterEach(() => {
        jest.clearAllMocks();
        firestore.reset();
    });

    it("writes notification", async () => {
        firestore.data = mFirestore();
        admin.firestore.Timestamp.now.mockReturnValueOnce(1000);
        const newStudy = await firestore.collection('studies').doc("TEST_STUDY").get();

        await func(newStudy, null);

        expect(firestore.set).toHaveBeenCalled();
        const notifications = await firestore
            .collection('researchers').doc('TEST_RESEARCHER_ID')
            .collection('notifications').get();
        expect(notifications.empty).toBe(false);
        const notification = notifications[0].data();
        expect(notification.time).toBe(1000);
        expect(notification.read).toBe(false);
        expect(notification.title).toBeDefined();
        expect(notification.description).toBeDefined();
        expect(notification.type).toBeDefined();
    });
});

describe("notification-triggers.onDeleteStudy", () => {
    let func;

    beforeEach(async () => {
        func = Funcs.onDeleteStudy(context)
    });

    afterEach(() => {
        jest.clearAllMocks();
        firestore.reset();
    });

    it("writes notification", async () => {
        firestore.data = mFirestore();
        admin.firestore.Timestamp.now.mockReturnValueOnce(1000);
        const deletedStudy = await firestore.collection('studies').doc("TEST_STUDY").get();

        await func(deletedStudy, null);

        expect(firestore.set).toHaveBeenCalled();
        const notifications = await firestore
            .collection('researchers').doc('TEST_RESEARCHER_ID')
            .collection('notifications').get();
        expect(notifications.empty).toBe(false);
    });
});



const mFirestore = () => ({
    collection: {
        // studies firestore collection
        studies: {
            "TEST_STUDY": {
                nctID: "TEST_STUDY",
                researcher: {
                    id: "TEST_RESEARCHER_ID",
                }
            }
        },
        // researchers firestore collection
        researchers: {
            "TEST_RESEARCHER_ID": {
                collection: {
                    "notifications": {},
                }
            }
        },
        // participants firestore collection
        participants: {
            "TEST_PARTICIPANT_ID": {
                collection: {
                    "notifications": {},
                }
            }
        },
    }
})