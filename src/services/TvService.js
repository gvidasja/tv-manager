import { toShowModel, toSeasonModel } from '../models/tv'
import { makeUrl } from '../util/url'
import { range } from '../util/array'

const api_host = 'api.themoviedb.org'
const api_key = 'd68d3b2e396a05b44f3d050d6bdfd929'
const image_host = 'image.tmdb.org'

const makeApiRequest = (path, query) => fetch(makeUrl(api_host, path, { ...query, api_key })).then(r => r.json())

const searchTvShows = query => makeApiRequest('/3/search/tv', { query })
    .then(r => r.results.map(toShowModel))

const getTvShow = showId => makeApiRequest(`/3/tv/${showId}`)
    .then(toShowModel(image_host))

const getTvShowSeasons = (showId, numberOfSeasons) => Promise.all(
    range(numberOfSeasons)
        .map(seasonIndex => makeApiRequest(`/3/tv/${showId}/season/${seasonIndex}`)
            .then(toSeasonModel)
        )
)

export default {
    searchTvShows,
    getTvShow,
    getTvShowSeasons
}