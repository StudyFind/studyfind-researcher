let isQueryingDoc = false;

const mFirestore = {
    // actually present methods
    collection: jest.fn(() => { isQueryingDoc = false; return mFirestore; }),
    where: jest.fn(() => mFirestore),
    doc: jest.fn(() => { isQueryingDoc = true; return mFirestore; }),
    set: jest.fn(async () => undefined),
    get: jest.fn(async () => {
        let snapshot = mFirestore.snapshot();
        snapshot.empty = snapshot.length === 0;
        return isQueryingDoc
            ? {
                exists: true,
                data: mFirestore.data
            }
            : snapshot
    }),
    Timestamp: { now: jest.fn(() => 0) },

    // useful when mocking
    data: () => undefined,
    snapshot: jest.fn(() => []),
}

module.exports = {
    firestore: () => mFirestore
}