const func = require('./generate-survey')

describe('generate-survey', () => {
    it('distinguishes inclusion and exclusion criteria', () => {
        let res = func(`Inclusion Criteria:\ni1\ni2\nExclusion Criteria:\ne1\ne2`)

        expect(res).not.toBeUndefined()
        expect(res).toStrictEqual({ inclusion: ['i1', 'i2'], exclusion: ['e1', 'e2'] })
    })

    it('accepts shorthand criteria markings', () => {
        let res = func(`Inclusion:\ni1\nExclusion:\ne1`)
        expect(res).toStrictEqual({ inclusion: ['i1'], exclusion: ['e1'] })
    })

    it('accepts missing exclusion criteria', () => {
        let res = func(`Inclusion:\ni1`)
        expect(res).toStrictEqual({ inclusion: ['i1'], exclusion: [] })

        res = func(`Criteria:\ni1`)
        expect(res).toStrictEqual({ inclusion: ['i1'], exclusion: [] })
    })

    it('combines criteria with subpoints', () => {
        let res = func(`Inclusion:\nSymptoms:\nSymptom1\nSympton2\n\ni2\nExclusion:\ne1\ne2`)

        expect(res).toStrictEqual({ inclusion: ['Symptions: Symptom1, Symptom2', 'i2'], exclusion: ['e1', 'e2'] })
    })
})