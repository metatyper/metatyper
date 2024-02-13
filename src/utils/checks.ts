export const isDateObject = (date: any) => {
    return !!(date?.getTimezoneOffset && date?.setUTCFullYear)
}

export const isEqual = function (a: any, b: any) {
    if (a === b) return true

    if (typeof a != typeof b) return false

    if (a == b) return true

    if ((!a && b) || (a && !b)) return false

    if (isDateObject(a) && isDateObject(b)) return a.getTime() === b.getTime()

    if (typeof a !== 'object') return false

    if (a.length && a.length !== b.length) return false

    if (Object.keys(a).length != Object.keys(b).length) return false

    for (const key in a) {
        if (!(key in b) || !isEqual(a[key], b[key])) return false
    }

    return true
}
