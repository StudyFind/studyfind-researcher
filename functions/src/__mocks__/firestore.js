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

/**
 * Higher-order function that supports filtering the current level of data. Returns a new
 * function which should be called with current level of data to gain filtered data
 * Qs? Ask Mikolaj. Want to add a filter verb? Append a function that returns true/false to the list
 * @param {string} subject Field within current level of data to filter by
 * @param {string} verb Conditional (eg, '<')
 * @param {any} object Object to compare to. Should match subject field type
 */
const filter = (subject, verb, object) => {

    let conditionFunction = {
        '<': d => d[subject] < object,
        '>': d => d[subject] > object,
        '==': d => d[subject] == object,
        '<=': d => d[subject] <= object,
        '>=': d => d[subject] >= object,
        'array-contains': d => d[subject].some(item => item == object),
    }[verb];

    return (data => {
        // console.log(`filtering ${subject} ${verb} ${object} on:`, data)
        let resp = {};
        Object.keys(data).map(k => ({ id: k, data: data[k] }))
            .filter(d => conditionFunction(d.data))
            .forEach(d => resp[d.id] = d.data);
        return resp;
    })
}

const mFirestore = {
    // actually present methods
    collection: jest.fn(c => {
        mFirestore.path.push("collection")
        mFirestore.path.push(c);
        mFirestore.isQueryingDoc = false;
        return mFirestore;
    }),
    where: jest.fn((subject, verb, object) => {
        mFirestore.path.push(filter(subject, verb, object)); // push filter function onto path
        return mFirestore;
    }),
    select: jest.fn(() => mFirestore),
    doc: jest.fn(c => {
        mFirestore.path.push(c);
        mFirestore.isQueryingDoc = true;
        return mFirestore;
    }),
    add: jest.fn(async (d, transaction_d) => {
        let { queries, path, data } = mFirestore;
        if (mFirestore.isTransaction) d = transaction_d;
        path.push('0'); // add is for adding random document id
        queries.push(path);

        while (path.length > 1) {
            let p = path.shift();
            if (!data[p]) data[p] = {};
            data = data[p];
        }
        data[path.shift()] = d;
        path = [];
    }),
    set: jest.fn(async (d, transaction_d) => {
        let { queries, path, data } = mFirestore;
        if (mFirestore.isTransaction) d = transaction_d;
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
        if (mFirestore.isTransaction) d = transaction_d;
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
        const data = mFirestore.path.reduce((d, p) => typeof p === "function" ? p(d) : d[p], mFirestore.data); // individual path elem might be a filter function
        mFirestore.path = []
        // if querying single doc, easy peasy
        if (mFirestore.isQueryingDoc) {
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
    runTransaction: jest.fn(async (fn) => { mFirestore.isTransaction = true; return await fn(mFirestore) }),

    // useful when mocking / testing
    data: {}, // fill this with data on every test
    path: [], // current path
    queries: [], // paths taken so far
    reset: () => { mFirestore.data = {}; mFirestore.path = []; mFirestore.queries = []; },
    isQueryingDoc: false,
    isTransaction: false,
}

const firestore = () => mFirestore;
firestore.Timestamp = { now: jest.fn(() => 0) };

module.exports = firestore;