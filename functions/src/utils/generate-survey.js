const InclusionsMatcher = /(?:inclusions?\s*criteria:)((?:\n|.)*?)(?:exclusions?\s*criteria:)/gi
const ExclusionsMatcher = /(?:exclusions? criteria:)((?:\n|.)*?)$/gi
const SubpointMatcher = /(\n.*:\n(?:\n|.)*)(?:\n\n)/gi

module.exports = (criteria) => {
    const incMatch = criteria.matchAll(InclusionsMatcher).next().value
    const excMatch = criteria.matchAll(ExclusionsMatcher).next().value



    return {
        inclusion: incMatch ? makeCriteria(incMatch[1]) : [],
        exclusion: excMatch ? makeCriteria(excMatch[1]) : [],
    }
}

function makeCriteria(s) {
    s = s.replace(SubpointMatcher, (match, $1) => {
        let sp = $1.split('\n').filter(i => i.trim() !== '')
        return sp[0] + ' ' + sp.slice(1).join(', ') + '\n'
    })

    return s.split('\n').filter(i => i.trim() !== '')
}
