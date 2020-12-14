let isQueryingDoc = false;
let isTransaction = false;

const updateData = (data, path, newData, create = false) => {
    while (path.length > 1) {
        let p = path.shift();
        if (!data[p]) {
            if (!create) throw TypeError(`Cannot read property '${p}' of ${data}`);
            else data[p] = {}
        }
        data = data[p];
    }
    data[path.shift()] = newData;
}

const mFirestore = {
    // actually present methods
    collection: jest.fn(c => {
        mFirestore.path.push("collection")
        mFirestore.path.push(c);
        isQueryingDoc = false;
        return mFirestore;
    }),
    where: jest.fn(() => mFirestore),
    select: jest.fn(() => mFirestore),
    doc: jest.fn(c => {
        mFirestore.path.push(c);
        isQueryingDoc = true;
        return mFirestore;
    }),
    set: jest.fn(async (d, transaction_d) => {
        let { queries, path, data } = mFirestore;
        if (isTransaction) d = transaction_d;
        queries.push(path);

        while (path.length > 1) {
            let p = path.shift();
            if (!data[p]) data[p] = {};
            data = data[p];
        }
        data[path.shift()] = d;
        path = [];
    }),
    update: jest.fn(async (d, transaction_d) => {
        let { queries, path, data } = mFirestore;
        if (isTransaction) d = transaction_d;
        queries.push(path);

        while (path.length > 1) {
            data = data[path.shift()];
        }
        let p = path.shift();
        data[p] = { ...data[p], ...d };
        path = [];
    }),
    get: jest.fn(async () => {
        mFirestore.queries.push(mFirestore.path);
        const data = mFirestore.path.reduce((d, p) => d[p], mFirestore.data);
        mFirestore.path = []
        // if querying single doc, easy peasy
        if (isQueryingDoc) {
            let d = { ...data }
            delete d.collection;
            return { exists: !!d, data: () => d };
        }
        // if querying collection, need to convert to array too
        let snapshots = Object.keys(data).map(k => {
            let d = { ...data[k] };
            delete d.collection;
            return { id: k, data: () => d }
        });
        snapshots.empty = snapshots.length === 0;
        return snapshots
    }),
    Timestamp: { now: jest.fn(() => 0) },
    runTransaction: jest.fn(async (fn) => { isTransaction = true; return await fn(mFirestore) }),

    // useful when mocking / testing
    data: {}, // fill this with data on every test
    path: [], // current path
    queries: [], // paths taken so far
    reset: () => { mFirestore.data = {}; mFirestore.path = []; mFirestore.queries = []; }
}

module.exports = {
    firestore: () => mFirestore
}
