import React, { Component } from 'react'
import TvService from '../services/TvService'
import { SimpleTvShowCard } from './TvShowCard'
import './ShowSearch.css'

const ShowSearchView = ({ onSearch, onShowSelect, results, ...props }) => (
    <div className="show-search" {...props}>
        <div className="search">
            <input 
                autoFocus
                type="text"
                onChange={e => onSearch(e.target.value)}
            />
        </div>
        <div className="results">
        {results.map(r => 
            <div className="result" key={r.id}>
                <SimpleTvShowCard
                    name={r.name}
                    posterPath={r.posterPath}
                    overview={r.overview}
                    onClick={() => onShowSelect(r.id)}
                />
            </div>
        )}
        </div>
    </div>
)

export class ShowSearch extends Component {
    constructor() {
        super()

        this.state = { results: [] }
        this.debounce = null

        this.onSearch = this.onSearch.bind(this)
    }

    onSearch(searchQuery) {
        if(this.debounce) clearTimeout(this.debounce)

        this.debounce = setTimeout(() => searchQuery && TvService.searchTvShows(searchQuery)
            .then(results => this.setState({ results })), 1000)
    }

    render() {
        const { results } = this.state
        const { onShowSelect } = this.props

        return (
            <ShowSearchView 
                results={results}
                onSearch={searchQuery => this.onSearch(searchQuery)}
                onShowSelect={onShowSelect}
                {...this.props}
            />
        )
    }
}