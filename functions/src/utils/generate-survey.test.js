const func = require('./generate-survey')

describe('generate-survey', () => {
    it('distinguishes inclusion and exclusion criteria', () => {
        let res = func(`Inclusion Criteria:\ni1\ni2\nExclusion Criteria:\ne1\ne2`)

        expect(res).not.toBeUndefined()
        expect(res).toStrictEqual({ inclusion: ['i1', 'i2'], exclusion: ['e1', 'e2'] })
    })

    it('combines criteria with subpoints', () => {
        let res = func(`Inclusion Criteria:\nSymptoms:\nSymptom1\nSymptom2\n\ni2\nExclusion Criteria:\ne1\ne2`)

        expect(res).toStrictEqual({ inclusion: ['Symptoms: Symptom1, Symptom2', 'i2'], exclusion: ['e1', 'e2'] })
    })
})