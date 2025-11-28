// IP address regexp
const ipv6Segment = '[a-fA-F\\d]{1,4}'

export const ipv4Pattern =
    '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}'
export const ipv6Pattern = `
(?:
(?:${ipv6Segment}:){7}(?:${ipv6Segment}|:)|
(?:${ipv6Segment}:){6}(?:${ipv4Pattern}|:${ipv6Segment}|:)|
(?:${ipv6Segment}:){5}(?::${ipv4Pattern}|(?::${ipv6Segment}){1,2}|:)|
(?:${ipv6Segment}:){4}(?:(?::${ipv6Segment}){0,1}:${ipv4Pattern}|(?::${ipv6Segment}){1,3}|:)|
(?:${ipv6Segment}:){3}(?:(?::${ipv6Segment}){0,2}:${ipv4Pattern}|(?::${ipv6Segment}){1,4}|:)|
(?:${ipv6Segment}:){2}(?:(?::${ipv6Segment}){0,3}:${ipv4Pattern}|(?::${ipv6Segment}){1,5}|:)|
(?:${ipv6Segment}:){1}(?:(?::${ipv6Segment}){0,4}:${ipv4Pattern}|(?::${ipv6Segment}){1,6}|:)|
(?::(?:(?::${ipv6Segment}){0,5}:${ipv4Pattern}|(?::${ipv6Segment}){1,7}|:))
)(?:%[0-9a-zA-Z]{1,})?`
    .replace(/\n/g, '')
    .trim()
export const ipv4OrIpv6Pattern = `(?:^${ipv4Pattern}$)|(?:^${ipv6Pattern}$)`

// URL regexp
const protocol = `(?:(?:[a-z]+:)?//)?`
const auth = '(?:\\S+(?::\\S*)?@)?'
const host = '(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)'
const domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*'
const tld = `(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?`
const port = '(?::\\d{2,5})?'
const path = '(?:[/?#][^\\s"]*)?'
export const urlPattern = `^(?:${protocol}|www\\.)${auth}(?:localhost|${ipv4Pattern}|${host}${domain}${tld})${port}${path}$`
