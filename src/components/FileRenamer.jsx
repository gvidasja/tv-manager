import React, { Component } from 'react'
import TvService from '../services/TvService'
import FileService from '../services/FileService'
import { FileList } from './FileList'
import { TvShowCard } from './TvShowCard'
import { swap, zip } from '../util/array'
import { pad } from '../util/number'
import { EpisodeList } from './EpisodeList'
import './FileRenamer.css'

const episodesInSeasons = seasons => seasons.reduce((sum, s) => sum + s.episodes.length, 0)

const generateFileName = (show, episode) => 
    `${show.name}.S${pad(episode.seasonNumber)}E${pad(episode.episodeNumber)}.${episode.name}`

const listAreEmptyOrDontMatch = (files, seasons) => 
    !files 
    || !seasons
    || files.length !== episodesInSeasons(seasons)

const FileRenamerView = ({ renameCompleted, reloadShow, show, rename, onFileChange, files, seasons, moveFileUp, moveFileDown, removeSeason, removeEpisode, ...props }) => (
    <div className="file-renamer" {...props}>
        { show && 
        <div className="top">
            <TvShowCard {...show}/>
            <div className="toolbar">
                <span>Select episodes and matching files</span>
                    <button
                        onClick={reloadShow}
                    >Reload episodes</button>
                    <button 
                        disabled={listAreEmptyOrDontMatch(files, seasons)}
                        onClick={rename}
                    >Rename</button>
            </div>
        </div>}
        { show && (
            <div className="lists">
                <EpisodeList
                    seasons={seasons}
                    removeSeason={removeSeason}
                    removeEpisode={removeEpisode}
                /> 
                <FileList
                    onFileChange={onFileChange}
                    files={files}
                    moveFileUp={moveFileUp}
                    moveFileDown={moveFileDown}
                />
            </div>
        )}
        <div className={`info ${renameCompleted && 'visible'}`}>Renaming completed!</div>
    </div>
)

export class FileRenamer extends Component {
    constructor() {
        super()

        this.state = { show: null, files: null }

        this.onFileChange = this.onFileChange.bind(this)
        this.moveFileUp = this.moveFileUp.bind(this)
        this.moveFileDown = this.moveFileDown.bind(this)
        this.removeSeason = this.removeSeason.bind(this)
        this.removeEpisode = this.removeEpisode.bind(this)
        this.reloadShow = this.reloadShow.bind(this)
        this.rename = this.rename.bind(this)
    }

    removeSeason(seasonIndex) {
        const { seasons } = this.state

        seasons.splice(seasonIndex, 1)

        this.setState({ seasons })
    }

    removeEpisode(seasonIndex, episodeIndex) {
        const { seasons } = this.state

        const episodes = seasons[seasonIndex].episodes
        
        episodes.splice(episodeIndex, 1)

        if(!episodes.length) this.removeSeason(seasonIndex)

        this.setState({ seasons })
    }

    moveFileUp(fileIndex) {
        this.setState({ files: swap(this.state.files, fileIndex, fileIndex - 1) })
    }

    moveFileDown(fileIndex) {
        this.setState({ files: swap(this.state.files, fileIndex, fileIndex + 1) })
    }

    onFileChange(filesList) {
        const files = Object.keys(filesList)
            .reduce((arr, key) => arr.concat(filesList[key]), [])

        this.setState({ files })
    }

    async rename() {
        const { files, seasons, show } = this.state

        const episodes = seasons.reduce((eps, s) => eps.concat(s.episodes.map(e => ({ ...e, seasonNumber: s.seasonNumber }))), [])

        await Promise.all(
            zip(files, episodes, (file, episode) => ({ file, episode }))
                .map(fe => FileService.renameAndPersistExtension(fe.file.path, generateFileName(show, fe.episode)))
        )

        this.setState({ renameCompleted: true })

        setTimeout(() => this.setState({ renameCompleted: false }), 5000)
    }

    async reloadShow() {
        const { showId } = this.props

        if(showId) {
            const show = await TvService.getTvShow(showId)
            const seasons = await TvService.getTvShowSeasons(show.id, show.numberOfSeasons)

            this.setState({ show, seasons })
        }
    }

    async componentWillMount() {
        await this.reloadShow()
    }

    render() {
        const { showId, ...props } = this.props
        const { show, seasons, files, renameCompleted } = this.state

        return (
            <FileRenamerView
                show={show}
                onFileChange={this.onFileChange}
                files={files}
                seasons={seasons}
                moveFileUp={this.moveFileUp}
                moveFileDown={this.moveFileDown}
                removeSeason={this.removeSeason}
                removeEpisode={this.removeEpisode}
                reloadShow={this.reloadShow}
                rename={this.rename}
                renameCompleted={renameCompleted}
                {...props} 
            />
        )
    }
}