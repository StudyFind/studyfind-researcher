module.exports = (criteria) => {
    let incMatch = criteria.matchAll(/(?:inclusions?\s*criteria:)((?:\n|.)*?)(?:exclusions?\s*criteria:)/gi).next().value
    let excMatch = criteria.matchAll(/(?:exclusions? criteria:)((?:\n|.)*?)$/gi).next().value



    return {
        inclusion: incMatch ? makeCriteria(incMatch[1]) : [],
        exclusion: excMatch ? makeCriteria(excMatch[1]) : [],
    }
}

function makeCriteria(s) {
    s = s.replace(/(\n.*:\n(?:\n|.)*)(?:\n\n)/gi, (match, $1) => {
        let sp = $1.split('\n').filter(i => i.trim() !== '')
        return sp[0] + ' ' + sp.slice(1).join(', ') + '\n'
    })

    return s.split('\n').filter(i => i.trim() !== '')
}