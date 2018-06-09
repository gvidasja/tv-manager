import React from 'react'
import './TvShowCard.css'

export const DetailedTvShowCard = ({ id, name, posterPath, overview, numberOfSeasons, ...props }) => (
    <div className="tv-show-card" {...props}>
        <div className="picture">
            <img src={posterPath} />
            <div className="details">
                <span className="title">{name}</span>
                <span className="subtitle">({numberOfSeasons} seasons)</span>
            </div>
        </div>
        <div className="overview">
            <p>{overview}</p>
        </div>
    </div>
)

export const SimpleTvShowCard = ({ id, name, posterPath, overview, numberOfSeasons, ...props }) => (
    <div className="tv-show-card" {...props}>
        <div className="picture">
            <img src={posterPath} />
            <div className="details">
                <span className="title">{name}</span>
            </div>
        </div>
    </div>
)