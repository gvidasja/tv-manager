import { makeUrl } from "../util/url";

export const toShowModel = host => s => ({
    id: s.id,
    name: s.name,
    posterPath: makeUrl(host, `/t/p/original${s.poster_path}`),
    overview: s.overview,
    numberOfSeasons: s.seasons.length
})

export const toEpisodeModel = e => ({
    name: e.name,
    episodeNumber: e.episode_number
})

export const toSeasonModel = s => ({
    seasonNumber: s.season_number,
    episodes: s.episodes.map(toEpisodeModel)
})