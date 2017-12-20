import React from 'react'
import './TvShowCard.css'

export const TvShowCard = ({ name, posterPath, overview, numberOfSeasons, ...props }) => (
    <div className="tv-show-card" {...props}>
        <img src={posterPath} />
        <div className="details">
            <h5>{name} ({numberOfSeasons} seasons)</h5>
            <div className="overview">
                <p>{overview}</p>
            </div>
        </div>
    </div>
)