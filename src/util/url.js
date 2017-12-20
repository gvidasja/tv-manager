import { format as formatUrl } from 'url'

export const makeUrl = (host, path, query) => formatUrl({
    host,
    protocol: 'https',
    slashes: true,
    pathname: path,
    query: query
})
