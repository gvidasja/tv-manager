import React from 'react'
import { pad } from '../util/number'

const empty = seasons => !seasons
    || !seasons.length
    || !seasons.reduce((sum, s) => sum + s.episodes.length, 0)

export const EpisodeList = ({ seasons, removeSeason, removeEpisode, ...props }) => (
    <div>{!empty(seasons) ? seasons
        .map((s, seasonIndex) => (
            <div key={seasonIndex}>
                <h4>{`Season ${s.seasonNumber}`}</h4>
                <button onClick={() => removeSeason(seasonIndex)}>x</button>
                {s.episodes
                .map((e, episodeIndex) => (
                    <div key={episodeIndex}>
                        <span>{`S${pad(s.seasonNumber)}E${pad(e.episodeNumber)} - ${e.name}`}</span>
                        <button onClick={() => removeEpisode(seasonIndex, episodeIndex)}>x</button>
                    </div>
                ))}
            </div>
        )) : <div>No episodes</div>}
    </div>
)