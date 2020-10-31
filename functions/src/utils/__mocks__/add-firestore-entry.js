module.exports = jest.fn(
    async (firestore, collection, data) => ({
        _path: {
            segments: [collection, `TEST_${collection}_ID`]
        }
    })
)