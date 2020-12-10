let isQueryingDoc = false;

const mFirestore = {
    // actually present methods
    collection: jest.fn(() => { isQueryingDoc = false; return mFirestore; }),
    where: jest.fn(() => mFirestore),
    doc: jest.fn(() => { isQueryingDoc = true; return mFirestore; }),
    set: jest.fn(async () => undefined),
    get: jest.fn(async () => {
        let data = mFirestore.data()
        if (isQueryingDoc)
            return { exists: !!data, data: mFirestore.data }

        if (!Array.isArray(data)) data = []
        data = data.map(snapshot => ({ data: () => snapshot, id: snapshot.id }))
        data.exists = data.length > 0
        return data
    }),
    Timestamp: { now: jest.fn(() => 0) },

    // useful when mocking
    data: jest.fn(() => undefined),
}

module.exports = {
    firestore: () => mFirestore
}