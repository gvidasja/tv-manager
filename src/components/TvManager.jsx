import React, { Component } from 'react'
import { FileRenamer } from './FileRenamer'
import { ShowSearch } from './ShowSearch'
import './TvManager.css'

const TvManagerView = ({ showId, onShowSelect, ...props }) => (
    <div className="tv-manager" {...props}>
    {showId 
        ? <FileRenamer showId={showId} />
        : <ShowSearch onShowSelect={onShowSelect}/>
    }
    </div>
)

export class TvManager extends Component {
    constructor() {
        super()

        this.state = {
            showId: null
        }

        this.onShowSelect = this.onShowSelect.bind(this)
    }

    onShowSelect(showId) {
        this.setState({ showId })
    }

    render() {
        const { showId } = this.state

        return (
            <TvManagerView 
                showId={showId || 62560} 
                onShowSelect={this.onShowSelect} 
                {...this.props}
            />
        )
    }
}