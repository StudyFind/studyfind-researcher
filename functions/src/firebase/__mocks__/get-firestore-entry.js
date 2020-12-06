module.exports = jest.fn(
    async ({ firestore, collection, document }) => ({
        exists: false,
    })
)