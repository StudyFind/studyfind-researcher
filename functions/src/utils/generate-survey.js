module.exports = (criteria) => {
    criteria = splitCriteriaType(criteria)



    return criteria
}

function splitCriteriaType(criteria) {
    let incMatch = criteria.matchAll(/(?:(?:inclusions?)?\s*criteria:)((?:\n|.)*?)(?:(?:exclusions?)?\s*criteria:)/gi).next().value
    let excMatch = criteria.matchAll(/(?:exclusions? criteria:)((?:\n|.)*?)$/gi).next().value

    return {
        inclusion: incMatch ? incMatch[1].trim().split('\n') : [],
        exclusion: excMatch ? excMatch[1].trim().split('\n') : [],
    }
}

function regexMatch(text, reg) {

}