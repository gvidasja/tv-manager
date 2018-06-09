import React, { Component } from 'react'
import { FileRenamer } from './FileRenamer'
import { ShowSearch } from './ShowSearch'
import './TvManager.css'

const TvManagerView = ({ showId, onShowSelect, deselectShow, ...props }) => (
    <div className="tv-manager" {...props}>
    {showId 
        ? <FileRenamer showId={showId} deselectShow={deselectShow}/>
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
                showId={showId} 
                onShowSelect={this.onShowSelect}
                deselectShow={() => this.onShowSelect('')}
                {...this.props}
            />
        )
    }
}